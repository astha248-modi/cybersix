# InventoryTrack — Department Inventory & Student Issue Management

A database-backed inventory and student borrowing application for a university department. Includes coordinator/student roles, quantity-based stock and individually tracked assets, 15-calendar-day loans and renewals, partial returns, audit records, overdue tracking, CSV reports, and a responsive React interface.

## Stack
React + TypeScript + Vite; Node.js + Express + TypeScript; PostgreSQL + Prisma; Zod, bcrypt, JWT, Helmet, rate limiting.

## Requirements
Node.js 20+, npm, and Docker Desktop (or PostgreSQL 15+).

## Run locally (PowerShell)
1. Copy `.env.example` to `.env` and set a long random `JWT_SECRET`.
2. Start PostgreSQL: `docker compose up -d db`
3. Install dependencies: `npm install`
4. Generate Prisma client: `npm run db:generate`
5. Apply schema: `npm run db:migrate`
6. Seed demo records: `npm run db:seed`
7. Start API and UI: `npm run dev`
8. Open http://localhost:5173. API health: http://localhost:4000/api/health

Demo logins after seeding (development only):
- Coordinator: `coordinator@demo.local` / `DemoCoordinator!2026`
- Student: `student@demo.local` / `DemoStudent!2026`

The seed refuses to run in production. Change/remove demo credentials before deployment.

## Commands
- `npm run dev` — API and frontend
- `npm run build` — production builds
- `npm test` — rule tests
- `npm run db:studio` — Prisma Studio
- `npm run db:migrate` — development migration

## Policy
Issue due date = issue date + 15 calendar days. Renewal requests never change due dates; coordinator approval adds 15 days to the existing due date. Returns may be partial. Damaged/lost/maintenance/retired stock is unavailable. Students are restricted to their own records by server-side authorization.

## API
Routes are under `/api`: `POST /auth/login`, `GET /auth/me`, `GET /dashboard`, `/students`, `/items`, `POST /issues`, `POST /issues/:id/returns`, `POST /issues/:id/renewals`, `PATCH /renewals/:id`, and `GET /reports/overdue`. OpenAPI JSON: `/api/openapi.json`.

## Security / deployment
Never commit real secrets. Configure HTTPS, strong JWT secret, production CORS, database backups, and institutional privacy review. CSV exports neutralize spreadsheet formula prefixes. Email delivery and institutional SSO are not configured.

## GitHub
```powershell
git clone https://github.com/astha248-modi/cybersix.git
cd cybersix
git pull origin main
```

This is a development implementation; run migrations, tests, and the acceptance workflow locally before treating it as production-ready.
