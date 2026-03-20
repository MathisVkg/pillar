# Stage 1 — Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/main/package.json ./apps/main/
COPY packages/database/package.json ./packages/database/
RUN npm ci

# Stage 2 — Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/main/node_modules ./apps/main/node_modules
COPY --from=deps /app/packages/database/node_modules ./packages/database/node_modules
COPY . .
# Generate Prisma client
RUN cd packages/database && npx prisma generate
# Build Next.js
RUN cd apps/main && npm run build

# Stage 3 — Production runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone Next.js build
COPY --from=builder --chown=nextjs:nodejs /app/apps/main/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/main/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/main/public ./public

# Copy Prisma files needed at runtime
COPY --from=builder --chown=nextjs:nodejs /app/packages/database/prisma ./packages/database/prisma
COPY --from=builder --chown=nextjs:nodejs /app/packages/database/generated ./packages/database/generated
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
