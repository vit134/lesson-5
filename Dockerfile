FROM node:carbon

ENV PORT=3000
ENV NODE_ENV='production'

WORKDIR ./

COPY package*.json ./


RUN npm install
RUN npm run clone git@github.com:vit134/lesson-5.git ./
COPY . .

CMD npm start -- --port $PORT
