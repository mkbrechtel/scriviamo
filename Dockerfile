FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

ENV SCRIVIAMO_SERVER_ENV=prod

COPY . .
RUN yarn build
CMD node server.js
