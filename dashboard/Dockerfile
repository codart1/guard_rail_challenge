# Base image
FROM node:16

# Create app directory
WORKDIR /usr/src/dashboard

COPY . .

# Install app dependencies
RUN npm install

# start dev mode
CMD [ "npm", "run", "dev", "--", "--host" ]