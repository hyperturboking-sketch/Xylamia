# Xylamia Backend

Xylamia uses Supabase Edge Functions as the API layer and CockroachDB as the main application database.

## Architecture

```text
React frontend
  -> Supabase Edge Function API
  -> CockroachDB
```

Supabase can still provide auth, hosting-friendly functions, and storage. CockroachDB stores profiles, universities, applications, notifications, ratings, and chat history.

## Environment Variables

Set this secret for the Supabase function:

```bash
supabase secrets set COCKROACH_DATABASE_URL="postgresql://USER:PASSWORD@HOST:26257/defaultdb?sslmode=require"
```

The current API scaffold expects authenticated frontend requests to send:

```text
Authorization: Bearer <supabase-user-id>
```

Before production, replace that temporary user-id shortcut with real Supabase JWT verification inside `supabase/functions/server/db.ts`.

## Database Setup

Run the CockroachDB schema:

```bash
cockroach sql --url "$COCKROACH_DATABASE_URL" --file schema/cockroach.sql
```

Or with Node:

```bash
COCKROACH_DATABASE_URL="postgresql://..." node scripts/apply-cockroach-schema.mjs
```

## API Routes

All routes are under:

```text
/make-server-90b23d77
```

Routes:

- `GET /health`
- `GET /universities`
- `GET /profile`
- `PUT /profile`
- `GET /recommendations`
- `GET /applications`
- `POST /applications`
- `GET /notifications`
- `POST /chat`

## Next Backend Work

- Verify Supabase JWTs server-side.
- Connect chat to a real AI model.
- Add a university data ingestion job.
- Add notification generation for deadlines and newly matching colleges.
- Connect the React app to these API routes.
