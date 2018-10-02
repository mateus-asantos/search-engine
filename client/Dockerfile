FROM node:8.9.4

ENV PORT2=3000

RUN mkdir /client

WORKDIR /client

ADD / /client

RUN npm install

EXPOSE 3000

CMD npm start