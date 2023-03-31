const crypto = require('crypto');
const fs = require('fs');
const PRIVATE_KEY = fs.readFileSync('./private.pem', 'utf8');

const decryptAddress = (address) => {
    const decryptedAddress = {};
    Object.keys(address).forEach(property => {
        if (address[property]) {
            const buffer = Buffer.from(address[property], 'base64');
            const decrypted = crypto.privateDecrypt({ key: PRIVATE_KEY, passphrase: process.env.PASSPHRASE, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING }, buffer);
            decryptedAddress[property] = decrypted.toString('utf8');
        }
    });
    return decryptedAddress;
};

module.exports = {
    decryptAddress,
  };
