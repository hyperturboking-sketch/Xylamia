# Xylamia Nhost Backend

Xylamia is moving to Nhost as the main backend:

- Nhost Auth for student accounts.
- Nhost Postgres for app data.
- Hasura GraphQL for frontend reads and writes.
- Nhost Functions for AI chat, recommendation scoring, and notification jobs.

## Frontend Environment

Copy `.env.example` to `.env.local` and fill in your Nhost project values:

```bash
VITE_NHOST_SUBDOMAIN=your-nhost-subdomain
VITE_NHOST_REGION=your-nhost-region
```

The frontend client lives at:

```text
src/app/lib/nhost.ts
```

## Database Schema

The initial migration is here:

```text
nhost/migrations/default/0001_xylamia_core
```

It creates:

- `student_profiles`
- `universities`
- `applications`
- `notifications`
- `chat_messages`

## Recommended Next Work

1. Create a Nhost project.
2. Apply the migration with the Nhost CLI.
3. Track the tables in Hasura.
4. Add permissions so users can only access their own profile, applications, notifications, and chat messages.
5. Replace the static React data with GraphQL queries.
6. Add Nhost Functions for AI chat and recommendation scoring.
