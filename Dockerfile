FROM node:carbon

ENV NODE_ENV='production'

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD [ "npm", "start" ]
