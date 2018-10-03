FROM node:8.9.4

ENV SCHMAPZ_PORT=8000

RUN mkdir /server

RUN npm install nodemon -g

COPY package.json /server/

WORKDIR /server/

ADD . /server/

RUN npm install
RUN npm install --save http-errors

EXPOSE 8000

CMD npm start