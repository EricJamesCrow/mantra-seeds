const AWS = require('../config/aws-config');
const { v4: uuidv4 } = require('uuid');

const s3 = new AWS.S3();

async function uploadImage(image) {
    try {
        const fileName = `${uuidv4()}.webp`;

        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileName,
            Body: image,
            ContentType: 'image/webp',
            CacheControl: 'public, max-age=31536000, immutable'
        };
        
        const result = await s3.upload(params).promise();

        // replace S3 bucket URL with CloudFront URL
        const cloudFrontDomain = process.env.CLOUDFRONT_URL;  // replace with your CloudFront domain
        const cloudFrontUrl = result.Location.replace(`https://${process.env.AWS_S3_BUCKET_NAME}.s3.us-west-1.amazonaws.com`, cloudFrontDomain);

        return cloudFrontUrl;
    } catch (error) {
        console.error('Error uploading image: ', error);
        return null;  // Re-throw the error so it can be handled elsewhere if needed
    }
};

module.exports = {
    uploadImage,
};
