#!/bin/bash

# Check if root
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 
   exit 1
fi

# Install Nginx
apt update
apt install -y nginx

# Update nginx.conf with provided configuration
cat > /etc/nginx/nginx.conf <<EOF
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
        worker_connections 768;
        # multi_accept on;
}

http {

        ##
        # Basic Settings
        ##

        sendfile on;
        tcp_nopush on;
        types_hash_max_size 2048;
        # server_tokens off;

        # server_names_hash_bucket_size 64;
        # server_name_in_redirect off;

        include /etc/nginx/mime.types;
        default_type application/octet-stream;

        ##
        # SSL Settings
        ##

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;

        ##
        # Logging Settings
        ##

        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;

        ##
        # Gzip Settings
        ##

        gzip on;

        upstream backend {
                least_conn;
                server 127.0.0.1:3001 weight=1;
                server 127.0.0.1:3002 weight=1;
        }

        # Main server block
        server {
            listen 80;
            listen [::]:80;
            server_name localhost;
        
            location / {
                proxy_pass http://backend;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
            }
        }

        server {
            listen 3001;
            listen [::]:3001;
            server_name 127.0.0.1;

            location / {
                root /var/www/html;
                index index.html;
                try_files $uri $uri/ /index.html?$args;
            }
        }

        server {
            listen 3002;
            listen [::]:3002;
            server_name 127.0.0.1;

            location / {
                root /var/www/instance-2;
                index index.html;
                try_files $uri $uri/ /index.html?$args;
            }
        }


        include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;
}
EOF

# Restart Nginx
systemctl restart nginx

echo "Nginx installed, configured, and restarted successfully."