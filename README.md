# Pillar

Pillar is a private IT consultancy management monorepo for personal/internal use. It is not currently intended as a public SaaS product.

- `apps/main` is the main consultant/client platform for admin operations and the client portal.
- `apps/finpilot` is a separate finance extension intended to run on a subdomain.
- `packages/database` contains the shared Prisma/MariaDB schema and client package.

FinPilot helps track company income, expenses, VAT estimates, P&L, recurring expenses, exports, and synced paid Pillar invoices. It does not replace an accountant. Pillar invoices are useful operational records, but they are not intended to replace legally/accounting-valid invoices.

## Monorepo Structure

```txt
.
|-- package.json                  # npm workspace root and root scripts
|-- apps/
|   |-- main/                     # Main Pillar consultant/client platform
|   `-- finpilot/                 # Finance extension, dev port 3001
|-- packages/
|   `-- database/                 # Prisma schema, migrations, seed files, generated client output
|-- Dockerfile                    # Multi-app Docker build with ARG APP=main|finpilot
`-- .github/workflows/deploy.yml  # Builds and pushes app images to GHCR
```

## Tech Stack

- npm workspaces
- Next.js 15.3.1 App Router
- React 19
- NextAuth v5 beta
- Prisma 6
- MariaDB/MySQL
- Tailwind CSS v4
- Biome

Do not introduce the Pages Router, ESLint, Prettier, or an external i18n library.

## Root Scripts

Run from the repository root:

```sh
npm run dev
npm run build
npm run dev:finpilot
npm run build:finpilot
```

- `npm run dev` starts `apps/main`.
- `npm run build` builds `apps/main`.
- `npm run dev:finpilot` starts `apps/finpilot` on port `3001`.
- `npm run build:finpilot` builds `apps/finpilot`.

## Development Setup

Install dependencies:

```sh
npm install
```

Create local environment files as needed. Local files currently used in development include:

- `apps/main/.env`
- `apps/main/.env.local`
- `apps/finpilot/.env.local`
- `packages/database/.env`

Generate the Prisma client:

```sh
npm run db:generate --workspace=packages/database
```

Run migrations from the database package:

```sh
cd packages/database
npx prisma migrate dev
```

For production/deployment migration execution, use:

```sh
cd packages/database
npx prisma migrate deploy
```

Seed the admin user from `packages/database/prisma/seed.ts`. The seed requires `ADMIN_EMAIL` and `ADMIN_PASSWORD` in the environment. There is no root seed script at the moment, so verify the exact command in your local setup before running it. One direct option is to run the seed file with `ts-node` from `packages/database`.

Start the apps:

```sh
npm run dev
npm run dev:finpilot
```

## Environment Variables

Known variables found in the repository/local env files:

```txt
DATABASE_URL
ADMIN_EMAIL
ADMIN_PASSWORD
NEXTAUTH_SECRET
NEXTAUTH_URL
NEXT_PUBLIC_APP_URL
DB_HOST
DB_PORT
DB_NAME
DB_USER
DB_PASSWORD
INVOICE_COMPANY_NAME
INVOICE_ADDRESS
INVOICE_CITY
INVOICE_VAT_NUMBER
INVOICE_EMAIL
INVOICE_IBAN
```

Notes:

- `DATABASE_URL` is used by Prisma.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` are used by the admin seed.
- `NEXTAUTH_SECRET` and `NEXTAUTH_URL` are used by NextAuth/Auth.js runtime configuration.
- Invoice variables are used by main app PDF invoice generation.
- Docker sets `PORT=3000` and `HOSTNAME=0.0.0.0` in the production runner.
- Verify deployment-only values in the deployment environment before changing them.

Do not commit secrets.

## Database

The Prisma schema is at:

```txt
packages/database/prisma/schema.prisma
```

The datasource provider is `mysql`, with MariaDB 11 intended for production. The generated Prisma client output is:

```txt
packages/database/generated/client
```

That generated client is intentionally ignored by Git. Run `npm run db:generate --workspace=packages/database` before local builds if it is missing. The Docker build also runs Prisma generate before building the selected app.

Seed files:

- `packages/database/prisma/seed.ts`
- `packages/database/prisma/seed-test-client.ts`

Migrations are kept under:

```txt
packages/database/prisma/migrations
```

Do not remove migrations. For schema changes, create a proper Prisma migration.

## Main App

`apps/main` handles the admin console, client portal, clients, tickets, time tracking, assets, contracts, billing, invoices, and PDF invoice generation.

Locales:

- Supported locales: `fr`, `en`, `nl`
- Default locale: `fr`
- `/` redirects to `/fr/dashboard`
- User-facing app routes are locale-prefixed
- API routes are not locale-prefixed

Main app routes include:

```txt
/:locale/admin/login
/:locale/dashboard
/:locale/clients
/:locale/clients/:clientId
/:locale/assets
/:locale/assets/:assetId
/:locale/tickets
/:locale/tickets/:ticketId
/:locale/contracts
/:locale/billing
/:locale/billing/invoices
/:locale/billing/invoices/:invoiceId
/:locale/login
/:locale/portal
/:locale/portal/:clientSlug
```

Main API routes include:

```txt
/api/auth/[...nextauth]
/api/dashboard
/api/clients
/api/clients/:clientId
/api/clients/:clientId/users
/api/clients/:clientId/users/:userId
/api/assets
/api/assets/:assetId
/api/contracts
/api/contracts/:contractId
/api/tickets
/api/tickets/:ticketId
/api/time-entries
/api/time-entries/:entryId
/api/billing/summary
/api/invoices
/api/invoices/:invoiceId
/api/invoices/:invoiceId/pdf
/api/portal/validate-token
/api/portal/validate-slug
```

## FinPilot

`apps/finpilot` handles expenses, income, VAT summary, P&L, recurring expenses, exports, and syncing paid Pillar invoices into finance income.

Locales:

- Supported locales: `en`, `fr`, `nl`
- Default locale: `en`
- `/` redirects to `/en/dashboard`
- Development server runs on port `3001`

FinPilot routes include:

```txt
/:lang/dashboard
/:lang/expenses
/:lang/income
/:lang/vat
/:lang/pl
/:lang/recurring
/:lang/export
/:lang/login
```

FinPilot API routes include:

```txt
/api/auth/[...nextauth]
/api/dashboard/summary
/api/expenses
/api/expenses/:id
/api/external-income
/api/external-income/:id
/api/income
/api/income-sync
/api/recurring-expenses
/api/recurring-expenses/:id
/api/vat-summary
/api/pl-summary
/api/export/expenses
/api/export/income
/api/export/vat-summary
```

## Authentication Model

Main app authentication uses NextAuth credential providers:

- `admin` checks the shared `Admin` table.
- `portal` checks `ClientUser`, active client status, active user status, and password hash.

Magic links are for quick/basic client portal access and must remain more limited than regular authenticated portal users.

FinPilot is admin-only and uses the shared `Admin` table.

## Deployment

The Dockerfile supports:

```sh
docker build --build-arg APP=main .
docker build --build-arg APP=finpilot .
```

During the Docker build, Prisma Client is generated from `packages/database`, then the selected app is built. The runner image copies the generated Prisma client and Prisma runtime files needed by the app.

`.github/workflows/deploy.yml` builds and pushes two images to GitHub Container Registry:

- `ghcr.io/mathisvkg/pillar-main:latest`
- `ghcr.io/mathisvkg/pillar-finpilot:latest`

The intended deployment shape is:

- Main app on the main domain
- FinPilot on a subdomain

Verify production environment variables in the deployment target.

## FinPilot PWA Notes

FinPilot has basic PWA installability support:

- Manifest: `apps/finpilot/public/site.webmanifest`
- App metadata links the manifest from `apps/finpilot/app/layout.tsx`
- App icons live in `apps/finpilot/public`
- No service worker is currently added
- No authenticated finance data is cached offline

For phone installability testing, use the deployed HTTPS domain or a secure tunnel. Browser install prompts generally require a secure context.

## Agent Rules

Future AI/code agents should read and follow `AGENTS.md` before making changes. In particular, keep edits focused, avoid unrelated refactors, preserve locale routing and API boundaries, and do not touch Prisma schema/migrations, auth, API routes, or global CSS unless the task explicitly requires it.
