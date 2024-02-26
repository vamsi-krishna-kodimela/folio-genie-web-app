FROM node:alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install --force

RUN npm run build

FROM nginx:latest

COPY --from=build /usr/src/app/dist/folio-genie-web-app /usr/share/nginx/html

EXPOSE 8080