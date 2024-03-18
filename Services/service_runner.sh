#!/bin/bash

sudo apt update -y
curl https://raw.github.com/creationix/nvm/master/install.sh | sh
source ~/.nvm/nvm.sh
nvm install 18
nvm use 18
npm install pm2@latest -g

# Array of folder names
folders=("EasyPass-auth-service" "EasyPass-event-catalog-service" "EasyPass-order-management-service" "EasyPass-payment-service" "EasyPass-ticketing-service")


for folder in "${folders[@]}"
do
    cd "$folder" || { echo "Failed to enter $folder. Exiting."; exit 1; }
    echo "Installing dependencies for $folder..."
    npm install || { echo "Failed to install dependencies for $folder. Exiting."; exit 1; }
    echo "Starting service $folder with PM2..."
    pm2 start index.js --name "$folder" || { echo "Failed to start service $folder with PM2. Exiting."; exit 1; }
    cd ..
done

echo "All services started successfully with PM2."