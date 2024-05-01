FROM node:20.2.0

WORKDIR /opt/app

COPY ./yarn.lock ./
COPY ./package.json ./
COPY ./.env ./
RUN yarn install

CMD ["yarn", "start"]
