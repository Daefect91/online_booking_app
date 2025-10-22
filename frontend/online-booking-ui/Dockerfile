# Use the latest LTS version of Node.js
FROM node:22-alpine
 
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package*.json ./
 
# Clean up previous installations and reinstall
#RUN rm -rf node_modules package-lock.json && npm install
RUN npm install
 
# Copy the rest of your application files
COPY . .
 
# Expose the port your app runs on
EXPOSE 5173
 
# Define the command to run your app
CMD ["npm", "run", "dev"]