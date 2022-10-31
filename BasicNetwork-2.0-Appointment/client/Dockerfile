#touqeershah/foms
FROM node:7
WORKDIR /client
COPY ./client /client
CMD cd ./client
RUN npm install
RUN npm install fabric-ca-client
RUN npm install fabric-client
RUN npm rebuild
CMD node app.js
EXPOSE 4000

