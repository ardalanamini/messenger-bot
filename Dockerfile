FROM node:12.18.0-alpine

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api

WORKDIR /home/node/api

COPY --chown=node:node package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

RUN npm run build

RUN rm -rf node_modules/

RUN npm install --production

USER root

RUN apk del native-deps

USER node

EXPOSE 3000

CMD [ "npm", "start" ]
