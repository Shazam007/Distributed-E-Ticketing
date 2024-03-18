#!/bin/bash

sudo rm -rf /var/www/html/*
sudo mkdir /var/www/instance-2
sudo cp -r ./dist/* /var/www/html/
sudo cp -r ./dist/* /var/www/instance-2/
sudo chown -R ubuntu:ubuntu /var/www/
sudo chmod 755 -R /var/www/

echo "Script execution completed."