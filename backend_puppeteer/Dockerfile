FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# have nodemon available for local dev use (file watching)
RUN npm install -g nodemon

COPY package*.json /usr/src/app/

ENV PUPPETEER_SKIP_DOWNLOAD=true

RUN npm install --legacy-peer-deps

COPY . /usr/src/app/

EXPOSE 2025

CMD ["node", "index.js"]