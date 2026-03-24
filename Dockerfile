# Stage 1 — Install all dependencies
FROM node:20-alpine AS deps
WORKDIR /app
ARG APP=main
COPY package.json package-lock.json ./
COPY apps/${APP}/package.json ./apps/${APP}/
COPY packages/database/package.json ./packages/database/
RUN npm ci

# Stage 2 — Build
FROM node:20-alpine AS builder
WORKDIR /app
ARG APP=main
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN cd packages/database && npx prisma generate
RUN cd apps/${APP} && npm run build

# Stage 3 — Production runner
FROM node:20-alpine AS runner
WORKDIR /app
ARG APP=main
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs \
  /app/apps/${APP}/.next/standalone/apps/${APP}/ ./

COPY --from=builder --chown=nextjs:nodejs \
  /app/apps/${APP}/.next/standalone/node_modules ./node_modules

COPY --from=builder --chown=nextjs:nodejs \
  /app/apps/${APP}/.next/static ./.next/static

COPY --from=builder --chown=nextjs:nodejs \
  /app/apps/${APP}/public ./public

COPY --from=builder --chown=nextjs:nodejs \
  /app/packages/database/generated ./packages/database/generated

COPY --from=builder --chown=nextjs:nodejs \
  /app/packages/database/generated/client ./generated/client

COPY --from=builder --chown=nextjs:nodejs \
  /app/node_modules/.prisma ./node_modules/.prisma

COPY --from=builder --chown=nextjs:nodejs \
  /app/node_modules/@prisma ./node_modules/@prisma

COPY --from=builder --chown=nextjs:nodejs \
  /app/packages/database/prisma ./packages/database/prisma

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
