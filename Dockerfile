FROM node:carbon

ENV PORT=3000
ENV NODE_ENV='production'

WORKDIR ./

COPY package*.json ./


RUN npm install

COPY . .

CMD echo blablabla ${PORT}

CMD npm start -- --port $PORT
