import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { requireUserId, recommendationScore, sql } from "./db.ts";
const app = new Hono();

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unexpected server error";
}

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-90b23d77/health", (c) => {
  return c.json({
    status: "ok",
    service: "xylamia-api",
    database: Deno.env.get("COCKROACH_DATABASE_URL") ? "configured" : "missing",
  });
});

app.get("/make-server-90b23d77/universities", async (c) => {
  const rows = await sql`
    SELECT
      id,
      name,
      location,
      rating,
      acceptance_rate,
      avg_sat,
      avg_gpa,
      tuition,
      programs,
      strengths,
      weaknesses,
      application_deadline,
      image_url,
      description
    FROM universities
    ORDER BY rating DESC, name ASC
  `;

  return c.json({ universities: rows });
});

app.get("/make-server-90b23d77/profile", async (c) => {
  try {
    const userId = requireUserId(c.req.header("Authorization"));
    const [profile] = await sql`
      SELECT *
      FROM student_profiles
      WHERE user_id = ${userId}
      LIMIT 1
    `;

    return c.json({ profile: profile ?? null });
  } catch (error) {
    return c.json({ error: errorMessage(error) }, 401);
  }
});

app.put("/make-server-90b23d77/profile", async (c) => {
  try {
    const userId = requireUserId(c.req.header("Authorization"));
    const body = await c.req.json();
    const [profile] = await sql`
      UPSERT INTO student_profiles (
        user_id,
        full_name,
        email,
        grade,
        gpa,
        sat_score,
        act_score,
        intended_major,
        location,
        interests,
        preferred_location,
        max_annual_budget
      )
      VALUES (
        ${userId},
        ${body.full_name ?? null},
        ${body.email ?? null},
        ${body.grade ?? null},
        ${body.gpa ?? null},
        ${body.sat_score ?? null},
        ${body.act_score ?? null},
        ${body.intended_major ?? null},
        ${body.location ?? null},
        ${body.interests ?? []},
        ${body.preferred_location ?? "any"},
        ${body.max_annual_budget ?? null}
      )
      RETURNING *
    `;

    return c.json({ profile });
  } catch (error) {
    return c.json({ error: errorMessage(error) }, 400);
  }
});

app.get("/make-server-90b23d77/recommendations", async (c) => {
  try {
    const userId = requireUserId(c.req.header("Authorization"));
    const [profile] = await sql`
      SELECT *
      FROM student_profiles
      WHERE user_id = ${userId}
      LIMIT 1
    `;

    const universities = await sql`
      SELECT *
      FROM universities
      ORDER BY rating DESC, name ASC
    `;

    const recommendations = universities
      .map((university) => ({
        ...university,
        recommendation_score: recommendationScore(profile, university),
      }))
      .sort((a, b) => b.recommendation_score - a.recommendation_score);

    return c.json({ recommendations });
  } catch (error) {
    return c.json({ error: errorMessage(error) }, 401);
  }
});

app.get("/make-server-90b23d77/applications", async (c) => {
  try {
    const userId = requireUserId(c.req.header("Authorization"));
    const applications = await sql`
      SELECT
        a.*,
        u.name AS university_name,
        u.location AS university_location,
        u.application_deadline
      FROM applications a
      JOIN universities u ON u.id = a.university_id
      WHERE a.user_id = ${userId}
      ORDER BY u.application_deadline ASC NULLS LAST, a.created_at DESC
    `;

    return c.json({ applications });
  } catch (error) {
    return c.json({ error: errorMessage(error) }, 401);
  }
});

app.post("/make-server-90b23d77/applications", async (c) => {
  try {
    const userId = requireUserId(c.req.header("Authorization"));
    const body = await c.req.json();
    const [application] = await sql`
      INSERT INTO applications (user_id, university_id, status, notes)
      VALUES (${userId}, ${body.university_id}, ${body.status ?? "saved"}, ${body.notes ?? null})
      ON CONFLICT (user_id, university_id)
      DO UPDATE SET
        status = excluded.status,
        notes = excluded.notes,
        updated_at = now()
      RETURNING *
    `;

    return c.json({ application }, 201);
  } catch (error) {
    return c.json({ error: errorMessage(error) }, 400);
  }
});

app.get("/make-server-90b23d77/notifications", async (c) => {
  try {
    const userId = requireUserId(c.req.header("Authorization"));
    const notifications = await sql`
      SELECT *
      FROM notifications
      WHERE user_id = ${userId}
      ORDER BY is_read ASC, created_at DESC
    `;

    return c.json({ notifications });
  } catch (error) {
    return c.json({ error: errorMessage(error) }, 401);
  }
});

app.post("/make-server-90b23d77/chat", async (c) => {
  try {
    const userId = requireUserId(c.req.header("Authorization"));
    const body = await c.req.json();
    const prompt = String(body.message ?? "").trim();

    if (!prompt) {
      return c.json({ error: "Message is required" }, 400);
    }

    const [profile] = await sql`
      SELECT intended_major, grade, gpa, sat_score, act_score
      FROM student_profiles
      WHERE user_id = ${userId}
      LIMIT 1
    `;

    const response = profile
      ? `I can help with that. Based on your profile for ${profile.intended_major ?? "your intended major"}, start by building a balanced list of reach, target, and safety schools, then track deadlines and required essays for each one.`
      : "I can help with that. First, complete your Xylamia profile so I can personalize college recommendations, deadlines, and application advice.";

    await sql`
      INSERT INTO chat_messages (user_id, role, content)
      VALUES
        (${userId}, 'user', ${prompt}),
        (${userId}, 'assistant', ${response})
    `;

    return c.json({ response });
  } catch (error) {
    return c.json({ error: errorMessage(error) }, 400);
  }
});

Deno.serve(app.fetch);
