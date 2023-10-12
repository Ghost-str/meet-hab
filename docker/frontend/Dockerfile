FROM node:18.18-alpine

COPY src /app

WORKDIR /app/frontend/

RUN npm ci && npm run build

CMD [ "npm", "run", "start" ]