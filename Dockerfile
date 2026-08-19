# syntax=docker/dockerfile:1

# ─────────────────────────────────────────────────────────────
# EN2 Tech — production image for AWS Lightsail
#
# Multi-stage so the final image carries only the standalone
# server output and its runtime dependencies. Typical result is
# ~180MB rather than the ~1.2GB a naive single-stage build
# produces, which matters on a 1–2GB Lightsail instance.
# ─────────────────────────────────────────────────────────────

ARG NODE_VERSION=22-alpine

# ── 1. Dependencies ──
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
# Only the manifests, so this layer is cached until they change.
COPY package.json package-lock.json ./
RUN npm ci

# ── 2. Build ──
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* values are inlined at build time, so the public URL
# must be present here rather than only at runtime.
ARG NEXT_PUBLIC_SITE_URL=https://en2.tech
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ── 3. Runtime ──
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run as an unprivileged user rather than root.
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# `standalone` already contains the pruned node_modules and server.js.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

# Lets Docker/compose restart the container if the app stops responding.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
