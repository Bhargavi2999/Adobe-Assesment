# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files
COPY . .

# Expose ports
EXPOSE 8080
EXPOSE 3000

# Start API and UI
CMD ["npm", "start"]
