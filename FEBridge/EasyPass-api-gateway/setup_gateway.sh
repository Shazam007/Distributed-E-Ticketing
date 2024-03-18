#!/bin/bash

sudo apt update -y
curl https://raw.github.com/creationix/nvm/master/install.sh | sh
source ~/.nvm/nvm.sh
nvm install 18
nvm use 18
npm install pm2@latest -g
pm2 start "npm run dev" --name api-gateway
echo "API gateway started successfully with PM2."