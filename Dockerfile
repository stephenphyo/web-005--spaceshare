FROM node:18

# Set '/app' as the Working Directory
WORKDIR /app

# Copy 'package.json' and 'package-lock.json' to the Working Directory
COPY package*.json ./

# Install Packages & Dependencies
RUN npm install

# Copy the rest of the Application Code
COPY . .

# Expose Port 80 for the Application
EXPOSE 80

# Start Application
CMD ["npm", "start"]