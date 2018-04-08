FROM node:8

RUN mkdir -p /srv

WORKDIR /srv

COPY package.json ./

RUN npm install

COPY . .

RUN ["chmod", "+x", "/srv/app/wait_for_it.sh"]

EXPOSE 3000