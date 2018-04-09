FROM node:8

RUN mkdir -p /srv

WORKDIR /srv

COPY package.json ./

RUN npm install
RUN npm i -g pm2

COPY . .

RUN ["chmod", "+x", "/srv/wait_for_it.sh"]

EXPOSE 3000