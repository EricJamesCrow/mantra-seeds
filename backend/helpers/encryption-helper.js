const crypto = require('crypto');

const SECRET_KEY = process.env.AES_ENCRYPTION_KEY;
const ALGO = 'aes-256-gcm';

const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const salt = crypto.randomBytes(64);
  const key = crypto.pbkdf2Sync(SECRET_KEY, salt, 2145, 32, 'sha512');
  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
};

const decrypt = (encrypted) => {
  const bData = Buffer.from(encrypted, 'base64');
  const salt = bData.slice(0, 64);
  const iv = bData.slice(64, 80);
  const tag = bData.slice(80, 96);
  const text = bData.slice(96);
  const key = crypto.pbkdf2Sync(SECRET_KEY, salt, 2145, 32, 'sha512');
  const decipher = crypto.createDecipheriv(ALGO, key, iv);
  decipher.setAuthTag(tag);
  const deciphered = decipher.update(text, 'binary', 'utf8') + decipher.final('utf8');
  return deciphered;
};

const encryptAddress = async (address) => {
  const encryptedAddress = {};
  for (const property in address) {
    if (address[property]) {
      encryptedAddress[property] = encrypt(address[property]);
    }
  }
  return encryptedAddress;
};

const decryptAddress = (address) => {
  const decryptedAddress = {};
  Object.keys(address).forEach((property) => {
    if (address[property]) {
      decryptedAddress[property] = decrypt(address[property]);
    } else {
      console.warn(`Property "${property}" in the address object is undefined.`);
    }
  });
  return decryptedAddress;
};

module.exports = {
  encrypt,
  decrypt,
  encryptAddress,
  decryptAddress,
};
