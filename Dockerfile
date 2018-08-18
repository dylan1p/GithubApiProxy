FROM node:latest

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app

EXPOSE 3000
ENTRYPOINT ["npm", "start"]
