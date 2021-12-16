FROM node:16.13.1-alpine3.13 
# update packages
RUN apk update

WORKDIR /app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# copy configs to /app folder
COPY package*.json ./
COPY tsconfig*.json ./

COPY . ./
RUN ls -a
RUN npm install

CMD ["npm", "start"]