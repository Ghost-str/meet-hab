FROM node:18.18-alpine

COPY src /app

WORKDIR /app/backend/

RUN npm ci && npm run build

CMD [ "npm", "run", "start" ]


