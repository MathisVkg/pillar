# ── Stage 1: Install dependencies ────────────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app

# Install libc compatibility for native modules (e.g. bcryptjs)
RUN apk add --no-cache libc6-compat

# Copy workspace manifests
COPY package.json ./
COPY apps/main/package.json ./apps/main/package.json
COPY packages/database/package.json ./packages/database/package.json

# Install all workspace dependencies
RUN npm install --workspaces --include-workspace-root

# ── Stage 2: Build ────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

# Copy installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/main/node_modules ./apps/main/node_modules
COPY --from=deps /app/packages/database/node_modules ./packages/database/node_modules

# Copy all source files
COPY . .

# Generate Prisma client
RUN npm run db:generate --workspace=packages/database

# Build Next.js app (standalone output)
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build --workspace=apps/main

# ── Stage 3: Production runner ────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone server output
COPY --from=builder /app/apps/main/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/main/.next/static ./apps/main/.next/static
COPY --from=builder /app/apps/main/public ./apps/main/public

# Copy Prisma generated client (needed at runtime)
COPY --from=builder /app/packages/database/generated ./packages/database/generated

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/main/server.js"]
