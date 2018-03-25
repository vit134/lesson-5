FROM node:carbon

ENV PORT=3000
ENV NODE_ENV='production'

WORKDIR ./

COPY package*.json ./


RUN npm install
RUN npm run clone

COPY . .

CMD npm start -- --port $PORT
