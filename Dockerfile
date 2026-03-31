FROM node:20-alpine AS builder

WORKDIR /workspace

COPY api/package*.json ./api/
COPY web/package*.json ./web/

RUN npm ci --prefix ./api
RUN npm ci --prefix ./web

COPY api ./api
COPY web ./web

RUN npm --prefix ./api run prisma:generate
RUN npm --prefix ./api run build
RUN npm --prefix ./web run build

FROM node:20-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV WEB_DIST_PATH=/app/web-dist

COPY --from=builder /workspace/api/package*.json ./api/
COPY --from=builder /workspace/api/node_modules ./api/node_modules
COPY --from=builder /workspace/api/dist ./api/dist
COPY --from=builder /workspace/api/prisma ./api/prisma
COPY --from=builder /workspace/web/dist ./web-dist

EXPOSE 3000

CMD ["node", "api/dist/server.js"]
