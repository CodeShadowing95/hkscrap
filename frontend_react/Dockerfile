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

# Supprimez le fichier de configuration par défaut de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiez votre fichier de configuration personnalisé dans le conteneur
COPY nginx.conf /etc/nginx/conf.d/

# Exposez le port 80 et 2026
EXPOSE 80 2026

CMD nginx -g 'daemon off;'