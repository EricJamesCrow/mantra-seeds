#!/bin/bash

# Start the Node.js server with PM2, assuming the main entry point is named server.js
cd /var/backend
# npm run start

# Restart Nginx to apply the configuration changes
sudo service nginx restart
