FROM node:20.18-bookworm-slim

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]