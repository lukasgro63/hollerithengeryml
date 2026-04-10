# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) files to the working directory
COPY package*.json yarn.lock* ./

# Update Node.js and npm
RUN apt-get update && apt-get install -y nodejs npm

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install project dependencies
RUN npm install

# Copy the entire project content to the working directory inside the container
COPY . .

# Build the Angular project in production mode
# May need further configuration with nginx when deploying in the cloud
RUN ng build --configuration=production

# Command to run the Angular application (can be adjusted based on requirements)
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4201"]

