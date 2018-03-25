FROM node:carbon

ENV PORT=80
ENV NODE_ENV='production'

WORKDIR ./

COPY package*.json ./


RUN npm install

COPY . .

CMD npm start -- --port $PORT
