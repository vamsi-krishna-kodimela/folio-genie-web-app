FROM node:latest as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install -g @angular/cli

RUN npm install --force

RUN npm run build

FROM nginx:latest


COPY --from=build /usr/local/app/dist/folio-genie-web-app /usr/share/nginx/html

COPY --from=build /usr/local/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80