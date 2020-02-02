import encryptor from 'simple-encryptor';

let secretKey = localStorage.getItem('halfSeed');

if (!secretKey) {
  secretKey = Math.random()
    .toString(36)
    .substring(2, 15);
  localStorage.setItem('halfSeed', secretKey);
}

export default encryptor(process.env.REACT_APP_ENCYRPTION_KEY + secretKey);
