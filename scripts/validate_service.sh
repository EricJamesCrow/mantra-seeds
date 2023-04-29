#!/bin/bash

# Test the backend API with curl or other tools
# curl -s -o /dev/null -w "%{http_code}" http://localhost:4000/api/some-endpoint | grep -q "200"

# if [ $? -ne 0 ]; then
#   echo "Backend API is not responding as expected. Deployment failed."
#   exit 1
# fi

# # Test the frontend by checking the Nginx status
# service nginx status
# if [ $? -ne 0 ]; then
#   echo "Nginx is not running. Deployment failed."
#   exit 1
# fi
