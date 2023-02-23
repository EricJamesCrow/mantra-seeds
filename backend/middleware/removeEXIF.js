const sharp = require('sharp');
const fs = require('fs');

const removeEXIF = async (req, res, next) => {
    // Read the uploaded image file
    const inputBuffer = await sharp(req.file.buffer).toBuffer();

    // Remove EXIF data from the image buffer
    const outputBuffer = await sharp(inputBuffer)
        .rotate() // Fix orientation if needed
        .jpeg({ quality: 90, chromaSubsampling: '4:4:4' }) // Set output format and quality
        .toBuffer();

    // Write the modified image buffer back to the file system
    fs.writeFileSync(req.file.path, outputBuffer);
    next()
}

module.exports = removeEXIF;