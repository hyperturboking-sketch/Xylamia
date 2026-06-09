import postgres from "npm:postgres@3.4.5";

const databaseUrl = Deno.env.get("COCKROACH_DATABASE_URL");

if (!databaseUrl) {
  console.warn("COCKROACH_DATABASE_URL is not set. Database routes will fail until it is configured.");
}

export const sql = postgres(databaseUrl ?? "", {
  ssl: "require",
  max: 5,
  idle_timeout: 20,
  connect_timeout: 10,
});

export function requireUserId(authorization: string | undefined): string {
  if (!authorization) {
    throw new Error("Missing Authorization header");
  }

  // In production, verify the Supabase JWT and read the user sub claim.
  // For the current scaffold, the frontend can pass: Bearer <supabase-user-id>.
  const token = authorization.replace(/^Bearer\s+/i, "").trim();
  if (!token) {
    throw new Error("Missing bearer token");
  }

  return token;
}

export function recommendationScore(profile: any, university: any): number {
  let score = 50;
  const gpa = Number(profile?.gpa);
  const sat = Number(profile?.sat_score);
  const act = Number(profile?.act_score);

  if (!Number.isNaN(gpa)) {
    score += Math.min(20, Math.max(-15, (gpa - 3.2) * 12));
  }

  if (!Number.isNaN(sat)) {
    score += Math.min(15, Math.max(-10, (sat - 1200) / 40));
  } else if (!Number.isNaN(act)) {
    score += Math.min(15, Math.max(-10, (act - 25) * 1.5));
  }

  if (profile?.intended_major && Array.isArray(university.programs)) {
    const major = String(profile.intended_major).toLowerCase();
    if (university.programs.some((program: string) => program.toLowerCase().includes(major))) {
      score += 15;
    }
  }

  if (profile?.preferred_location && university.location) {
    const preferred = String(profile.preferred_location).toLowerCase();
    const location = String(university.location).toLowerCase();
    if (preferred !== "any" && location.includes(preferred)) {
      score += 8;
    }
  }

  if (typeof university.acceptance_rate === "number" && university.acceptance_rate < 8) {
    score -= 8;
  }

  return Math.max(1, Math.min(100, Math.round(score)));
}
