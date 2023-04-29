#!/bin/bash

# Update package lists
sudo yum update -y

# Install Nginx
sudo yum install -y nginx

# Install PM2 globally
sudo npm install -g pm2

