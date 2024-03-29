FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

ENV db_uri='mongodb+srv://kum:PHL6iGBNiXcO7y4o@kumov-sajt-xhyh3.mongodb.net/dev?retryWrites=true'

ENV jwt_secret='tajaikoka'

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "app.js" ]

