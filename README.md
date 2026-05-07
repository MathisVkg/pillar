# Pillar

Pillar is a monorepo for managing IT consulting operations. It contains the main Pillar application, a FinPilot finance application, and a shared Prisma database package.

## Apps

| App | Path | Description | Default port |
| --- | --- | --- | --- |
| Pillar | `apps/main` | Main IT consulting dashboard for clients, tickets, assets, visits, time tracking, invoices, and contracts. | `3000` |
| FinPilot | `apps/finpilot` | Finance dashboard for expenses, external income, recurring costs, and income tracking. | `3001` |
| Database package | `packages/database` | Shared Prisma client and MariaDB schema used by the apps. | - |

## Tech stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma
- MariaDB 11
- NextAuth
- Biome
- npm workspaces

## Repository structure

```txt
.
├── apps
│   ├── main          # Main Pillar app
│   └── finpilot      # Finance app
├── packages
│   └── database      # Prisma schema and shared database client
├── package.json      # Workspace scripts
├── package-lock.json
└── README.md
