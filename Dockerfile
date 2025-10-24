FROM node:18-alpine

WORKDIR /app

RUN npm i -g serve

COPY build ./build

EXPOSE 3000

CMD ["serve", "-s", "build"]