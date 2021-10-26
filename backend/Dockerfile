FROM node:14.17-alpine
WORKDIR /app
COPY . /app/
RUN npm install
RUN npm start
COPY . /app/
EXPOSE 3000
CMD ["node","build/server.js"]