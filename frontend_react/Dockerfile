FROM node:latest as build-stage

RUN mkdir -p /usr/src/web

WORKDIR /usr/src/web

COPY package*.json /usr/src/web/

RUN npm install --legacy-peer-deps

COPY . /usr/src/web/

RUN npm run build

# Étape suivante, utiliser une image Nginx pour servir l'application
# depuis le répertoire /app/build

# Utilisez une image Nginx comme image parent
FROM nginx:1.22.0-alpine

# Copiez les fichiers de build de l'application React dans le répertoire de travail de Nginx
COPY --from=build-stage /usr/src/web/build /usr/share/nginx/html

# Exposez le port 80
# EXPOSE 80

COPY scrap.hkdigitals.com.conf /etc/nginx/nginx.conf

CMD nginx -g 'daemon off;'