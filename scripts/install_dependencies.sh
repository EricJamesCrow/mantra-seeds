#!/bin/bash

# Update package lists
sudo yum update -y

# Install Nginx
sudo yum install -y nginx

# Install PM2 globally
npm install -g pm2

# Add local directory to PATH environment variable
echo 'export PATH=$PATH:~/.npm-global/bin' >> ~/.bashrc

# Reload the configuration
source ~/.bashrc
