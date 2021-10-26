FROM node:14.17-alpine
WORKDIR /app
COPY . /app/
RUN npm install
RUN npm run create-folder
COPY . /app/
EXPOSE 3000
CMD ["npm","run","run:system"]