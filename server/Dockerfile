FROM node:8.9.4

ENV SCHMAPZ_PORT=8000

RUN mkdir /server

RUN npm install nodemon -g

WORKDIR /server

ADD / /server

RUN npm install

EXPOSE 8000

CMD npm start