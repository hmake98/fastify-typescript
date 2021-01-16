FROM node:12-alpine

WORKDIR /app

RUN apk add --no-cache --virtual .build-deps alpine-sdk python

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm build \
  && apk del .build-deps

EXPOSE 4002

CMD [ "npm",  "start" ]