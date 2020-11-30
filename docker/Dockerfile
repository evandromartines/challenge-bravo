FROM node:14

RUN mkdir -p /home/challenge-bravo/library/node_modules
RUN mkdir -p /home/challenge-bravo/library && chown -R node:node /home/challenge-bravo

WORKDIR /home/challenge-bravo/library

COPY package*.json ./

RUN npm install update
RUN npm install

USER node


EXPOSE 3000