# Stage 1 — Install all dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/main/package.json ./apps/main/
COPY packages/database/package.json ./packages/database/
RUN npm ci

# Stage 2 — Build
FROM node:20-alpine AS builder
WORKDIR /app

# Copy ALL node_modules from root only (workspaces hoists everything here)
COPY --from=deps /app/node_modules ./node_modules

# Copy source files
COPY . .

# Generate Prisma client
RUN cd packages/database && npx prisma generate

# Build Next.js app
RUN cd apps/main && npm run build

# Stage 3 — Production runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone Next.js output
COPY --from=builder --chown=nextjs:nodejs /app/apps/main/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/main/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/main/public ./public

# Copy Prisma engine and generated client from root node_modules
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

# Copy prisma schema for migrations
COPY --from=builder --chown=nextjs:nodejs /app/packages/database/prisma ./packages/database/prisma

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
