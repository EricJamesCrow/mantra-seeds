const AWS = require('../config/aws-config');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

const s3 = new AWS.S3();

async function uploadImage(image) {
    const fileName = `${uuidv4()}.jpg`;

    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: image.buffer,
        ContentType: image.mimetype
    };
    
    const result = await s3.upload(params).promise();
    return result.Location;
};


module.exports = {
    uploadImage,
  };