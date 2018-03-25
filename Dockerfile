FROM node:carbon

ENV NODE_ENV='production'

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

RUN git clone https://github.com/vit134/lesson-5 /
RUN cd /app

EXPOSE ${PORT}

CMD [ "npm", "start" ]
