# Base image
FROM node:16

# Create app directory
WORKDIR /usr/src/api

# Copy source code to image
COPY . .

# Install app dependencies
RUN npm install

# start dev mode
CMD [ "npm", "run", "start:dev" ]