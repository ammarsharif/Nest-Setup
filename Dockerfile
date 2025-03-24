# Step 1: Use Node.js official image
FROM node:20-alpine

# Step 2: Set working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy all other files to the container
COPY . .

# Step 5: Build the app (if using TypeScript)
RUN npm run build

# Step 6: Expose the port NestJS runs on
EXPOSE 3000

# Step 7: Command to run the app
CMD ["node", "dist/main.js"]
