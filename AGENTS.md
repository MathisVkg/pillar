# AGENTS.md

Rules and project context for future Codex tasks in this repository.

## Project Context

- Pillar is a private IT consultancy management tool for personal/internal use.
- Pillar is not currently intended as a public SaaS product.
- `apps/main` is the main consultant/client platform.
- `apps/finpilot` is a separate finance extension, intended to run on a subdomain.
- `packages/database` contains the shared Prisma/MariaDB client and schema.
- FinPilot tracks company income, expenses, VAT estimates, P&L, recurring expenses, exports, and synced paid Pillar invoices.
- FinPilot does not replace the accountant.

## Stack

- npm workspaces.
- Next.js 15.3.1 App Router.
- React 19.
- NextAuth v5 beta.
- Prisma 6.
- MariaDB/MySQL.
- Tailwind CSS v4.
- Biome for lint/format.
- Do not introduce Pages Router, ESLint, Prettier, or external i18n libraries.

## App Structure

- Root workspace manifest: `package.json`.
- Main app: `apps/main`.
- FinPilot app: `apps/finpilot`.
- Shared database package: `packages/database`.

Root scripts:

- `npm run dev` -> `apps/main`.
- `npm run build` -> `apps/main`.
- `npm run dev:finpilot` -> `apps/finpilot` on port 3001.
- `npm run build:finpilot` -> `apps/finpilot`.

## Main App Rules

`apps/main` handles:

- Admin console.
- Client portal.
- Clients.
- Tickets.
- Time tracking.
- Assets.
- Contracts.
- Billing.
- Invoices.
- PDF invoice generation.

Locale rules:

- Supported locales: `fr`, `en`, `nl`.
- Default locale: `fr`.
- Root `/` redirects to `/fr/dashboard`.
- All user-facing app routes are locale-prefixed.

Main app route summary:

- `/:locale/admin/login`
- `/:locale/dashboard`
- `/:locale/clients`
- `/:locale/clients/:clientId`
- `/:locale/assets`
- `/:locale/assets/:assetId`
- `/:locale/tickets`
- `/:locale/tickets/:ticketId`
- `/:locale/contracts`
- `/:locale/billing`
- `/:locale/billing/invoices`
- `/:locale/billing/invoices/:invoiceId`
- `/:locale/login`
- `/:locale/portal`
- `/:locale/portal/:clientSlug`

Main API route summary:

- `/api/auth/[...nextauth]`
- `/api/dashboard`
- `/api/clients`
- `/api/clients/:clientId`
- `/api/clients/:clientId/users`
- `/api/clients/:clientId/users/:userId`
- `/api/assets`
- `/api/assets/:assetId`
- `/api/contracts`
- `/api/contracts/:contractId`
- `/api/tickets`
- `/api/tickets/:ticketId`
- `/api/time-entries`
- `/api/time-entries/:entryId`
- `/api/billing/summary`
- `/api/invoices`
- `/api/invoices/:invoiceId`
- `/api/invoices/:invoiceId/pdf`
- `/api/portal/validate-token`
- `/api/portal/validate-slug`

## FinPilot Rules

`apps/finpilot` handles:

- Expenses.
- Income.
- VAT summary.
- P&L.
- Recurring expenses.
- Exports.
- Syncing paid Pillar invoices into finance income.

Locale rules:

- Supported locales: `en`, `fr`, `nl`.
- Default locale: `en`.
- Root `/` redirects to `/en/dashboard`.
- Runs on port 3001 in dev/start scripts.

FinPilot route summary:

- `/:lang/dashboard`
- `/:lang/expenses`
- `/:lang/income`
- `/:lang/vat`
- `/:lang/pl`
- `/:lang/recurring`
- `/:lang/export`
- `/:lang/login`

FinPilot API route summary:

- `/api/auth/[...nextauth]`
- `/api/dashboard/summary`
- `/api/expenses`
- `/api/expenses/:id`
- `/api/external-income`
- `/api/external-income/:id`
- `/api/income`
- `/api/income-sync`
- `/api/recurring-expenses`
- `/api/recurring-expenses/:id`
- `/api/vat-summary`
- `/api/pl-summary`
- `/api/export/expenses`
- `/api/export/income`
- `/api/export/vat-summary`

## Translation Rules

- Never hardcode user-facing strings in components.
- Client components must use `useTranslation` from `@/components/LangProvider`.
- Server components must use `getT(locale as Lang)` from `@/lib/i18n`.
- When adding a new string, add the key to all three translation files:
  - `lib/i18n/fr.ts`
  - `lib/i18n/en.ts`
  - `lib/i18n/nl.ts`
- Dutch values can temporarily mirror English.
- Keep translation key structure identical across all three files.
- Prefer existing namespaces: `nav`, `common`, `auth`, `dashboard`, `clients`, `timeEntries`, `tickets`, `billing`, `portal`, `quickLog`, `expenses`, `income`, `vat`, `pl`, `recurring`, `export`.
- Create a new namespace only when no existing namespace fits.

## Auth Rules

Main app:

- `apps/main/lib/auth.ts` has two credential providers:
  - `admin` checks the `Admin` table.
  - `portal` checks `ClientUser`, active client, active user, and optional password hash.
- Magic links are for quick/basic client portal access and must have less access than regular authenticated portal users.

FinPilot:

- Admin-only.
- Backed by the shared `Admin` table.

## API And Permission Rules

- API routes are not locale-prefixed.
- App routes are locale-prefixed.
- Do not move API routes under locale folders.
- Always check authorization in mutation API routes.
- Admin-only actions must verify `session.user.isAdmin`.
- Client portal routes must never expose internal-only data.
- Magic-link access must remain more limited than regular portal authentication.

## Database Rules

- Prisma schema is in `packages/database/prisma/schema.prisma`.
- Datasource provider is `mysql`.
- Intended database is MariaDB 11.
- Generated Prisma client output is `packages/database/generated/client`.
- `Client` is the central hub model.
- FinPilot tables use nullable `clientId`; `null` means company records.

Business rules:

- Time is stored in minutes, not decimal hours.
- Time entries store hourly rate snapshots.
- VAT defaults to `0.21`.
- Retainer clients use `retainerFee + extraHours * hourlyRate`.
- Ad hoc clients sum billable time entries using stored hourly rate.
- Invoice generation links uninvoiced billable `TimeEntry` rows to the generated invoice.
- FinPilot sync reads paid Pillar invoices and creates `IncomeEntry` rows with `sourceType = "pillar"`.
- Invoices are useful operational records but are not intended to replace legally/accounting-valid invoices.

## Do-Not-Touch Rules

Avoid changing these unless the task explicitly requires it:

- `packages/database/prisma/`
- `packages/database/index.ts`
- `apps/main/lib/auth.ts`
- `apps/finpilot/lib/auth.ts`
- `apps/main/app/api/`
- `apps/finpilot/app/api/`
- `apps/main/app/globals.css`
- `apps/finpilot/app/globals.css`
- `Dockerfile`
- `.github/workflows/deploy.yml`
- Invoice generation business logic.

## Audit Priorities

When auditing or improving the project, prioritize:

1. Security and authorization issues.
2. Data integrity bugs.
3. Build/runtime errors.
4. Bad assumptions in business logic.
5. Responsive/mobile issues.
6. PWA readiness for FinPilot.
7. Code cleanup and duplication.
8. Nice-to-have UX polish.
