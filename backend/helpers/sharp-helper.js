const sharp = require('sharp');

const WIDTH = 420;
const HEIGHT = 420;
const MAX_SIZE = 1024 * 1024;  // 1MB

// Resize image
const resizeImage = async (image) => { 
    try {
      let inputBuffer = image.buffer;
    
      // Check if image size is greater than MAX_SIZE
      if (inputBuffer.byteLength > MAX_SIZE) {
        // Compress the image if size > MAX_SIZE
        inputBuffer = await sharp(inputBuffer)
          .jpeg({ quality: 10 })  // You can adjust the quality value to fit your needs
          .toBuffer();
      }

      const outputBuffer = await sharp(inputBuffer)
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
