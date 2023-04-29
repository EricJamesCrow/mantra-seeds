#!/bin/bash

# Set up environment variables, assuming the .env file is placed in the /var/www/html/backend directory
# source /var/app/backend/.env

# Set up Nginx configuration for serving the React app
cp nginx.conf /etc/nginx/conf.d/nginx.conf
# ln -s /etc/nginx/sites-available/my-app /etc/nginx/sites-enabled/

# Reload the Nginx configuration
systemctl reload nginx