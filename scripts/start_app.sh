#!/bin/bash

# Start the Node.js server with PM2, assuming the main entry point is named server.js
cd /var/www/html/backend
pm2 start server.js --name my-app-backend

# Restart Nginx to apply the configuration changes
service nginx restart
