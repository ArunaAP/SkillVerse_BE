# Use a lightweight Node.js Alpine image
FROM node:alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application
COPY . .

# Expose the application port (update this if your app uses a different port)
EXPOSE 3000

# Start the Node.js application
CMD ["node", "src/index.js"]
