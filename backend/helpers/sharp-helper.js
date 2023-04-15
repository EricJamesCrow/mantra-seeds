const sharp = require('sharp');

// Resize image
const resizeImage = async (image) => {
    const width = 420;
    const height = 420;
  
    try {
      const outputBuffer = await sharp(image.buffer)
        .resize(width, height, {
          fit: 'cover',
          position: 'center',
        })
        .toFormat('jpeg', { quality: 100 })
        .toBuffer();
  
      return outputBuffer;
    } catch (error) {
      console.error('Error processing image:', error);
      throw error;
    }
  };

module.exports = { 
    resizeImage
};
