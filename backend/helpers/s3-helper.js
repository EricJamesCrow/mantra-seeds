const AWS = require('../config/aws-config');
const { v4: uuidv4 } = require('uuid');

const s3 = new AWS.S3();

async function uploadImage(image) {
    const fileName = `${uuidv4()}.jpg`;

    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: image,
        ContentType: 'image/jpeg'
    };
    
    const result = await s3.upload(params).promise();

    // replace S3 bucket URL with CloudFront URL
    const cloudFrontDomain = process.env.CLOUDFRONT_URL;  // replace with your CloudFront domain
    const cloudFrontUrl = result.Location.replace(`https://${process.env.AWS_S3_BUCKET_NAME}.s3.us-west-2.amazonaws.com`, cloudFrontDomain);

    return cloudFrontUrl;
};


module.exports = {
    uploadImage,
  };