ARG NODE_VERSION=20.11.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start:dev"]
