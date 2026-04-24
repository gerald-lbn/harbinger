FROM node:24-bookworm-slim AS base

# ----------------------------
# Stage 1: Prune the workspace
# ----------------------------
FROM base AS pruner
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune @harbinger/backend --docker

# ----------------------------
# Stage 2: Install and Build
# ----------------------------
FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN npm ci
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json
RUN npx turbo run build --filter=@harbinger/backend

# ----------------------------
# Stage 3: Production runtime
# ----------------------------
FROM base AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=installer /app/apps/backend/build ./
RUN npm install --omit=dev
EXPOSE 3333
CMD ["node", "bin/server.js"]
