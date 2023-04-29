#!/bin/bash

# Update package lists
apt-get update

# Install Nginx
apt-get install -y nginx

# Install PM2 globally
npm install -g pm2
