# Pillar

Pillar is a private/internal IT consultancy management monorepo for personal use. The repository is public for source control, backup, and GitHub Actions deployment convenience, not as a supported product or self-hosting project.

Pillar is not currently intended as a public SaaS product. FinPilot helps with internal finance tracking, but it does not replace an accountant. Pillar invoices are operational records and are not intended to replace legally/accounting-valid invoices.

## Apps

- `apps/main`: main consultant/client platform for admin work, clients, tickets, assets, time tracking, contracts, billing, invoices, and the client portal.
- `apps/finpilot`: finance extension for income, expenses, VAT estimates, P&L, recurring expenses, exports, and synced paid Pillar invoices.
- `packages/database`: shared Prisma/MariaDB package, schema, migrations, seed files, and generated client output.

## Stack

- npm workspaces
- Next.js 15.3.1 App Router
- React 19
- NextAuth v5 beta
- Prisma 6
- MariaDB/MySQL
- Tailwind CSS v4
- Biome

## Development

Install dependencies:

```sh
npm install
```

Generate the Prisma client when needed:

```sh
npm run db:generate --workspace=packages/database
```

Run the apps:

```sh
npm run dev
npm run dev:finpilot
```

Build the apps:

```sh
npm run build
npm run build:finpilot
```

`npm run dev` starts the main app. `npm run dev:finpilot` starts FinPilot on port `3001`.

## Database

The Prisma schema lives at:

```txt
packages/database/prisma/schema.prisma
```

Migrations live at:

```txt
packages/database/prisma/migrations
```

The generated Prisma client is written to `packages/database/generated/client` and is intentionally ignored by Git. Run Prisma generate before local builds when the generated client is missing. Do not remove migrations or seed files.

## Environment

Local environment files are required and are intentionally not committed. Do not commit secrets.

Common required categories include:

- Database connection, usually `DATABASE_URL`
- Auth configuration, including `NEXTAUTH_SECRET`
- Admin seed credentials, such as `ADMIN_EMAIL` and `ADMIN_PASSWORD`
- Deployment-specific URLs and invoice metadata where relevant

Check the code and deployment environment for the current required values.

## Deployment

The Dockerfile supports building either app with `APP=main` or `APP=finpilot`. GitHub Actions is used to build deployment images.

Production environment variables should be verified in the deployment target. The main app is intended for the main domain, and FinPilot is intended for a subdomain.

## FinPilot PWA

FinPilot has basic PWA installability support through its web app manifest and icons. There is currently no service worker and no offline caching of authenticated finance data.

## Agent Rules

Future AI/code agents should read and follow `AGENTS.md` before making changes.
