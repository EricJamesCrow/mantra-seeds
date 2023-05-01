#!/bin/bash

# Start the Node.js server with PM2, assuming the main entry point is named server.js
cd /var/backend
# testing
npm_prefix=$(npm config get prefix)
export PATH=$PATH:${npm_prefix}/bin
pm2 start server.js --name mantra-seeds-backend

# Restart Nginx to apply the configuration changes
sudo service nginx restart
