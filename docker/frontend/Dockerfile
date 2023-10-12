FROM node:18.18-alpine as builder

COPY src /app

WORKDIR /app/frontend/

RUN npm ci \
    && npm run build

FROM node:18.18-alpine

WORKDIR /app
COPY --from=builder /app/frontend/.next/standalone/frontend /app
COPY --from=builder /app/frontend/.next/standalone/node_modules /app/node_modules
COPY --from=builder /app/frontend/.next/static /app/.next/static
COPY --from=builder /app/frontend/public /app/public

CMD [ "node", "./server.js" ]