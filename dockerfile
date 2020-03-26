FROM node:13-slim

WORKDIR /data
COPY . .
RUN npm install 

EXPOSE 3000

CMD npm start