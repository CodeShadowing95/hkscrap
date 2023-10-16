FROM node:latest as build-stage

RUN mkdir -p /usr/src/web

WORKDIR /usr/src/web

COPY package*.json /usr/src/web/

RUN npm install --legacy-peer-deps

COPY . /usr/src/web/

RUN npm run build