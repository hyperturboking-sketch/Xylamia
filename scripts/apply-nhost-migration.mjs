import fs from "node:fs/promises";
import postgres from "postgres";

const databaseUrl = process.env.NHOST_DATABASE_URL;

if (!databaseUrl) {
  console.error("NHOST_DATABASE_URL is required.");
  process.exit(1);
}

const sql = postgres(databaseUrl, {
  ssl: "require",
  max: 1,
  idle_timeout: 5,
  connect_timeout: 10,
});

try {
  const migration = await fs.readFile(
    new URL("../nhost/migrations/default/0001_xylamia_core/up.sql", import.meta.url),
    "utf8",
  );

  const statements = migration
    .split(/;\s*(?:\r?\n|$)/)
    .map((statement) => statement.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await sql.unsafe(statement);
  }

  console.log(`Applied ${statements.length} Nhost migration statements.`);
} finally {
  await sql.end();
}
