FROM node:20

WORKDIR /ApiUol

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/src/index.js"]