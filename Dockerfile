FROM node:14.16.0-alpine3.10

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

RUN npm install

COPY ./src ./src

EXPOSE 5000

CMD npm run dev