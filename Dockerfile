FROM node:22.5.1-alpine3.19

WORKDIR /usr/src/app

COPY package*.json ./

ENV NODE_ENV=production

RUN npm install glob rimraf

RUN npm ci --only=production

COPY . .

RUN npm run build

USER node

CMD ["node", "dist/main"]