FROM node:18.18-alpine as builder

COPY src /app

WORKDIR /app/backend/

RUN npm ci && npm run build

FROM node:18.18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules         /app/node_modules
COPY --from=builder /app/backend/dist         /app/dist
COPY --from=builder /app/backend/package.json /app/package.json

CMD [ "npm", "run", "start" ]


