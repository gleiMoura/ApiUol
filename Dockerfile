FROM node:20

WORKDIR /apiuol

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

RUN npm run build

CMD ["npm", "run", "start"]