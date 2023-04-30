#!/bin/bash

# Update package lists
sudo yum update -y

# Install Nginx
sudo yum install -y nginx

# Install PM2 globally
sudo npm install -g pm2
curl -sL https://raw.githubusercontent.com/Unitech/pm2/master/packager/setup.deb.sh | sudo -E bash -
pm2 completion install
npm install pm2 -g && pm2 update
