import CryptoJS from 'crypto-js';

export const newHash = () => {
  return CryptoJS.SHA256(new Date().getTime().toString()).toString();
}