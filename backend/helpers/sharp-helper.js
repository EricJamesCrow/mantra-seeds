const sharp = require('sharp');

const WIDTH = 420;
const HEIGHT = 420;

// Resize image
const resizeImage = async (image) => { 
    try {
      const outputBuffer = await sharp(image.buffer)
        .resize(WIDTH, HEIGHT, {
          fit: 'cover',
          position: 'center',
        })
        .toFormat('webp', { quality: 80 })
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
