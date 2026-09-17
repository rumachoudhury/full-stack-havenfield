# Havenfield — Modern Real Estate Platform

A modern, full-stack real estate web application built with **Next.js, TypeScript, Tailwind CSS, Framer Motion, Prisma, and SQLite**.

Havenfield provides a polished property-browsing experience with searchable listings, property detail pages, tour requests, contact inquiries, and a real database-backed API.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8)
![License](https://img.shields.io/badge/license-Educational-lightgrey)

---

## Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [How Havenfield Works](#-how-havenfield-works)
- [Getting Started](#-getting-started)
- [Prisma Studio](#%EF%B8%8F-prisma-studio)
- [API Reference](#-api)
- [Adding a Property](#-adding-a-property)
- [Contact & Tour Requests](#-contact--tour-requests)
- [Database Seeding](#-database-seeding)
- [Current Limitations](#%EF%B8%8F-current-development-limitations)
- [Production Database](#%EF%B8%8F-production-database)
- [Deployment](#-deployment)
- [Useful Commands](#-useful-commands)
- [Git Workflow](#-git-workflow)
- [Author](#-author)
- [License](#-license)

---

## ✨ Features

- 🏠 Modern, responsive real estate UI
- 🔎 Property listing and search experience
- 🏡 Individual property detail pages
- 🖼️ Property image galleries
- 📅 Tour request functionality
- 📩 Contact and inquiry forms
- 💾 Real database storage with Prisma + SQLite
- 🔌 REST API for properties and inquiries
- 🎬 Smooth animations with Framer Motion
- 📱 Responsive design for desktop, tablet, and mobile
- 🛠️ Prisma Studio for visually managing database records
- 🌱 Seeded sample property listings

## 🧱 Tech Stack

**Frontend**
- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

**Backend**
- Next.js API Routes
- Prisma ORM
- SQLite (dev) / PostgreSQL-ready (production)

**Development**
- Node.js
- npm
- Git / GitHub

---

## 📁 Project Structure

```text
full-stack-havenfield/
│
├── app/
│   ├── api/
│   │   ├── properties/
│   │   │   ├── route.ts
│   │   │   └── [slug]/
│   │   │       └── route.ts
│   │   └── inquiries/
│   │       └── route.ts
│   │
│   ├── properties/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── contact/
│   │   └── page.tsx
│   │
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── PropertyCard.tsx
│   ├── PropertyGallery.tsx
│   ├── BookingCard.tsx
│   └── Footer.tsx
│
├── lib/
│   ├── db.ts
│   ├── queries.ts
│   └── mappers.ts
│
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   ├── seed-data.ts
│   └── dev.db          # created locally, not committed
│
├── public/
│
├── .env.example
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

> `dev.db` and `.env` are generated locally and excluded via `.gitignore` — only `.env.example` is committed.

---

## 🔄 How Havenfield Works

Havenfield is a full-stack Next.js application, split cleanly into three layers:

**Frontend** — renders the UI
```text
app/page.tsx
app/properties/page.tsx
app/properties/[slug]/page.tsx
app/contact/page.tsx
components/
```

**Backend** — Next.js API routes, the server-side logic
```text
app/api/properties/route.ts
app/api/properties/[slug]/route.ts
app/api/inquiries/route.ts
```
These endpoints handle requests and communicate with the database through Prisma.

**Database** — managed by Prisma
```text
prisma/schema.prisma
prisma/dev.db
```
The current development database uses SQLite.

**Data flow**
```text
Browser
   ↓
Next.js Frontend
   ↓
Next.js Server / API
   ↓
Prisma ORM
   ↓
SQLite Database
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18.17+**
- **npm**
- **Git**

Check your versions:
```bash
node -v
npm -v
git --version
```

### 1. Clone the repository

```bash
git clone https://github.com/rumachoudhury/full-stack-havenfield.git
cd full-stack-havenfield
```

### 2. Install dependencies

```bash
npm install
```
> If you hit an npm `edgesOut` error, run `npm install --legacy-peer-deps` instead.

### 3. Create environment variables

```bash
cp .env.example .env
```
The default configuration uses a local SQLite database, so no external database account is required for development.

### 4. Create the database

```bash
npx prisma migrate dev --name init
```
This will:
- Create the SQLite database
- Apply the Prisma schema
- Create the migration
- Generate Prisma Client

### 5. Seed sample properties

```bash
npm run db:seed
```

### 6. Start the development server

```bash
npm run dev
```

Open **http://localhost:3000**

---

## 🗄️ Prisma Studio

Prisma Studio is a visual, spreadsheet-style interface for the database.

```bash
npm run db:studio
```

Use it to:
- View, add, edit, or delete properties
- View contact inquiries and tour requests

---

## 🔌 API

Havenfield includes a database-backed REST API.

| Method   | Endpoint                 | Description         |
|----------|---------------------------|---------------------|
| `GET`    | `/api/properties`        | Get all properties  |
| `POST`   | `/api/properties`        | Create a property   |
| `GET`    | `/api/properties/[slug]` | Get one property    |
| `PATCH`  | `/api/properties/[slug]` | Update a property   |
| `DELETE` | `/api/properties/[slug]` | Delete a property   |
| `GET`    | `/api/inquiries`         | Get all inquiries   |
| `POST`   | `/api/inquiries`         | Create an inquiry   |

Example — this returns property data as JSON:
```text
http://localhost:3000/api/properties
```

---

## 🏡 Adding a Property

**Option A — Prisma Studio** (easiest during development)
```bash
npm run db:studio
```
Open the `Property` table and create a new record.

**Option B — via the API**
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
    "gallery": [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    ],
    "description": "A beautiful modern mountain home.",
    "features": [
      "Mountain views",
      "Wraparound deck"
    ]
  }'
```

---

## 📩 Contact & Tour Requests

The contact form and property tour-request forms both submit to:
```text
POST /api/inquiries
```
The inquiry is stored in the database through Prisma. View submissions any time with:
```bash
npm run db:studio
```
then open the `Inquiry` table.

---

## 🌱 Database Seeding

Sample property data lives in `prisma/seed-data.ts`, applied by `prisma/seed.ts`. Run:
```bash
npm run db:seed
```
to (re)populate the database.

---

## 🛡️ Current Development Limitations

Havenfield is currently a development / full-stack portfolio project. Planned next steps:

- [ ] Admin dashboard
- [ ] Authentication and authorization
- [ ] Protected property management
- [ ] Real email notifications
- [ ] Property image upload
- [ ] Cloud image storage
- [ ] Advanced property filtering
- [ ] Favorites / saved properties
- [ ] Agent profiles
- [ ] Production database
- [ ] Production deployment optimization

> **Important:** the current property API has no authentication on write operations. Add authentication and authorization before exposing it in a public production environment.

---

## ☁️ Production Database

SQLite is great for local development but not ideal for most hosted deployments. For production, use a hosted PostgreSQL database — Supabase, Neon, and Railway all work well.

Update the Prisma datasource:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Set the connection string:
```env
DATABASE_URL="your-production-database-url"
```

Apply migrations:
```bash
npx prisma migrate deploy
```

Seed sample data if needed:
```bash
npm run db:seed
```

The application layer doesn't change — `lib/queries.ts` and every page work identically regardless of which database sits behind Prisma.

---

## 🚀 Deployment

Havenfield deploys cleanly to platforms like **Vercel**.

1. Set up a production PostgreSQL database.
2. Configure `DATABASE_URL` as an environment variable on your host.
3. Run production migrations (`npx prisma migrate deploy`).
4. Deploy the Next.js application.

**Local dev:** `npm run dev`
**Production build:** `npm run build` then `npm start`

---

## 🔧 Useful Commands

| Command                     | Purpose                            |
|------------------------------|-------------------------------------|
| `npm install`                | Install dependencies               |
| `npm run dev`                | Start development server           |
| `npm run build`              | Create production build            |
| `npm start`                  | Start production server            |
| `npm run db:seed`            | Seed database                      |
| `npm run db:studio`          | Open Prisma Studio                 |
| `npx prisma migrate dev`     | Create/apply development migration |
| `npx prisma migrate deploy`  | Apply production migrations        |
| `npx prisma generate`        | Generate Prisma Client             |

---

## 📌 Git Workflow

```bash
git add .
git commit -m "Update Havenfield"
git push
```

Repository: **https://github.com/rumachoudhury/full-stack-havenfield**

---

## 👩‍💻 Author

**Ruma Choudhury**
GitHub: [github.com/rumachoudhury](https://github.com/rumachoudhury)

---

## 📄 License

This project is intended for portfolio and educational purposes.
