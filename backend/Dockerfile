FROM node:24-slim

WORKDIR /test-app

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["node", "server.js"]