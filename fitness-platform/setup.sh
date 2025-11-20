#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Setting up Online Fitness Training Platform...${NC}"

# Install root dependencies
echo -e "${GREEN}Installing root dependencies...${NC}"
npm install

# Install server dependencies
echo -e "${GREEN}Installing server dependencies...${NC}"
cd server
npm install
cd ..

# Install client dependencies
echo -e "${GREEN}Installing client dependencies...${NC}"
cd client
npm install
cd ..

# Create .env file for server if it doesn't exist
if [ ! -f "./server/.env" ]; then
  echo -e "${GREEN}Creating .env file for server...${NC}"
  echo "PORT=5000
NODE_ENV=development
DATABASE=mongodb://localhost:27017/fitness-platform
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90" > ./server/.env
  echo -e "${YELLOW}Created .env file with default values. Please update with your own values for production.${NC}"
fi

echo -e "${GREEN}Setup completed successfully!${NC}"
echo -e "${YELLOW}To start the application in development mode, run:${NC} npm run dev"
echo -e "${YELLOW}To start only the server, run:${NC} npm run server"
echo -e "${YELLOW}To start only the client, run:${NC} npm run client"