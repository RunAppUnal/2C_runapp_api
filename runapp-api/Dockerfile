FROM node:carbon-slim

# Create app directory
WORKDIR /git/runapp-api

# Install app dependencies
COPY package.json /git/runapp-api/
RUN npm install

# Bundle app source
COPY . /git/runapp-api/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]
