#!/bin/bash

# Set up environment variables, assuming the .env file is placed in the /var/www/html/backend directory
source /var/www/html/backend/.env

# Set up Nginx configuration for serving the React app
cp /var/www/html/frontend/nginx.conf /etc/nginx/sites-available/my-app
ln -s /etc/nginx/sites-available/my-app /etc/nginx/sites-enabled/

# Build the React frontend, assuming you have a build script in your frontend package.json
cd /var/www/html/frontend
npm run build
