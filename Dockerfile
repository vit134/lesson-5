FROM node:carbon

ENV NODE_ENV='production'

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN git clone --mirror https://github.com/vit134/lesson-5 ./app/git/

COPY . .

EXPOSE ${PORT}

CMD [ "npm", "start" ]
