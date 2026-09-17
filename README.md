# Havenfield — Modern Real Estate (Next.js + Tailwind + Framer Motion + Prisma)

## First-time setup

1. Unzip this project and open the folder in VS Code.
2. Install Node.js 18.17+ if you don't have it.
3. In the VS Code terminal:
   ```bash
   npm install
   ```
   If you hit an npm "edgesOut" error, run `npm install --legacy-peer-deps` instead.

4. Copy the example env file:
   ```bash
   cp .env.example .env
   ```
   (Already set up for local SQLite — no external database account needed to get started.)

5. Create the database and apply the schema:
   ```bash
   npx prisma migrate dev --name init
   ```
   This creates `prisma/dev.db` and generates the Prisma Client.

6. Seed it with the sample listings:
   ```bash
   npm run db:seed
   ```

7. Run the app:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## Browsing/editing the database visually

```bash
npm run db:studio
```
Opens Prisma Studio in your browser — a spreadsheet-like view of every table, where you can add/edit/delete properties and inquiries by hand.

## How data flows now

- **Listings** live in a real SQLite database (`prisma/dev.db`), not a hardcoded file.
- `lib/db.ts` — the Prisma Client singleton.
- `lib/queries.ts` — functions that fetch listings from the database (`getAllProperties`, `getFeaturedProperties`, `getPropertyBySlug`).
- `lib/mappers.ts` — the `Property` type and a mapper that converts a raw DB row into the shape components expect.
- `prisma/schema.prisma` — the database schema (`Property` and `Inquiry` models).
- `prisma/seed.ts` + `prisma/seed-data.ts` — the original sample listings, used to populate the database on first run.

## API routes (the "backend" part)

| Route | Method | Purpose |
|---|---|---|
| `/api/properties` | GET | List all properties |
| `/api/properties` | POST | Create a property |
| `/api/properties/[slug]` | GET / PATCH / DELETE | Read, update, or delete one property |
| `/api/inquiries` | POST | Submit a contact or tour-request form |
| `/api/inquiries` | GET | List all submitted inquiries |

The contact form and the tour-request form on each property page now really save to the database via `/api/inquiries` — check `npm run db:studio` after submitting one to see it land in the `Inquiry` table.

## Adding a listing right now (no admin UI yet)

Easiest path today is Prisma Studio (`npm run db:studio`) — add a row to the `Property` table directly. `gallery` and `features` are stored as JSON strings, e.g. `["https://...","https://..."]`.

Or via the API:
```bash
curl -X POST http://localhost:3000/api/properties \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "maple-ridge-house",
    "title": "Maple Ridge House",
    "location": "Asheville, NC",
    "price": 650000,
    "status": "For Sale",
    "type": "House",
    "beds": 3,
    "baths": 2,
    "sqft": 2100,
    "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "gallery": ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c"],
    "description": "A cozy mountain home.",
    "features": ["Mountain views", "Wraparound deck"]
  }'
```

## Moving to production

SQLite is great for local dev but isn't ideal for most hosted deployments (e.g. Vercel's filesystem is read-only/ephemeral). When you're ready to deploy:

1. Spin up a free Postgres database (Supabase, Neon, or Railway all work well).
2. In `prisma/schema.prisma`, change:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Set `DATABASE_URL` to your hosted Postgres connection string (in `.env` locally, and in your host's environment variables for production).
4. Run `npx prisma migrate deploy` to apply the schema, then `npm run db:seed` if you want the sample data.

Nothing else in the app changes — `lib/queries.ts` and every page work exactly the same regardless of which database is behind Prisma.

## What's still not built

- **No admin dashboard UI** — managing listings today means Prisma Studio or the API directly. A simple `/admin` page with a form + login is the natural next step.
- **No auth** — anyone with the API URL can currently POST/PATCH/DELETE properties. Fine for local development; needs an auth check (e.g. NextAuth) before this goes live publicly.
- **No email notifications** — inquiries save to the database but no email is sent to you when one comes in.
- **Images are still stock Unsplash URLs** in the seed data — swap for real listing photos (and consider an upload flow via Cloudinary/S3) when you have them.

## Deploy

Push this to a GitHub repo, import it in [Vercel](https://vercel.com), set your `DATABASE_URL` environment variable there, and deploy.
