#!/bin/bash

apt-get update -y
apt-get install nodejs npm -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
npm install pm2@latest -g

# Array of folder names
folders=("EasyPass-auth-service" "EasyPass-event-catalog-service" "EasyPass-order-management-service" "EasyPass-payment-service" "EasyPass-ticketing-service")

# Loop through each folder
for folder in "${folders[@]}"
do
    # Navigate into the folder
    cd "$folder" || { echo "Failed to enter $folder. Exiting."; exit 1; }

    # Install dependencies
    echo "Installing dependencies for $folder..."
    npm install || { echo "Failed to install dependencies for $folder. Exiting."; exit 1; }

    # Start service with PM2
    echo "Starting service $folder with PM2..."
    pm2 start index.js --name "$folder" || { echo "Failed to start service $folder with PM2. Exiting."; exit 1; }

    # Navigate back to the parent directory
    cd ..
done

echo "All services started successfully with PM2."