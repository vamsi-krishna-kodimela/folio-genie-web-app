FROM node:alpine AS build

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install --force

CMD [ "ng","serve","--port","8080" ]

EXPOSE 8080