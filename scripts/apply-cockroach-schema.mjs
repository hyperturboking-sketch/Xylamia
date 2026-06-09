import fs from "node:fs/promises";
import postgres from "postgres";

const databaseUrl = process.env.COCKROACH_DATABASE_URL;

if (!databaseUrl) {
  console.error("COCKROACH_DATABASE_URL is required.");
  process.exit(1);
}

const sql = postgres(databaseUrl, {
  ssl: "require",
  max: 1,
  idle_timeout: 5,
  connect_timeout: 10,
});

try {
  const schema = await fs.readFile(new URL("../schema/cockroach.sql", import.meta.url), "utf8");
  const statements = schema
    .split(/;\s*(?:\r?\n|$)/)
    .map((statement) => statement.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await sql.unsafe(statement);
  }

  console.log(`Applied ${statements.length} CockroachDB schema statements.`);
} finally {
  await sql.end();
}
