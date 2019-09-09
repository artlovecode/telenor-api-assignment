FROM node:12.10.0-alpine

WORKDIR /app
COPY . .

ENV HOST '0.0.0.0'
env MONGO_URL 'mongodb://mongo/test'
RUN yarn

EXPOSE 8080

CMD ["yarn", "start"]
