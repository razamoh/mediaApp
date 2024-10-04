# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies (ensures nodemon and TypeScript are installed globally)
RUN npm install -g nodemon typescript && npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to start the application using nodemon for development
CMD ["npm", "run", "start:dev"]
