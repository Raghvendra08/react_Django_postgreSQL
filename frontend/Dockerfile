# Use official Node.js image as the base image
FROM node:14-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install @mui/material @emotion/react @emotion/styled @mui/icons-material

# Copy source files
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight Node.js image for the production environment
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy the built app from the previous stage
COPY --from=build /app/build ./build

# Install serve to run the production build
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Command to run the React app
CMD ["serve", "-s", "build", "-l", "3000"]
