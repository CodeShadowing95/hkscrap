# Stage 1

FROM node:latest as build-stage

RUN mkdir -p /usr/src/web

WORKDIR /usr/src/web

COPY package*.json /usr/src/web/

RUN npm install --legacy-peer-deps

COPY . /usr/src/web/

RUN npm run build

# Stage 2

FROM nginx:1.22.0-alpine

COPY --from=build-stage /usr/src/web/build/ /usr/share/nginx/html/

COPY --from=build-stage /usr/src/web/build/ /var/www

COPY nginx.conf /etc/nginx/nginx.conf

CMD nginx -g 'daemon off;'