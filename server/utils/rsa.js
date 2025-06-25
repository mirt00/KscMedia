// utils/rsa.js
const bigInt = require('big-integer');

// Naive prime checker (use Miller-Rabin for production)
const isPrime = (num) => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++)
    if (num % i === 0) return false;
  return num > 1;
};

const generatePrime = (min = 100, max = 300) => {
  let p;
  do {
    p = Math.floor(Math.random() * (max - min)) + min;
  } while (!isPrime(p));
  return p;
};

const gcd = (a, b) => {
  return b === 0 ? a : gcd(b, a % b);
};

const modInverse = (e, phi) => {
  let [m0, x0, x1] = [phi, 0, 1];
  while (e > 1) {
    let q = Math.floor(e / phi);
    [e, phi] = [phi, e % phi];
    [x0, x1] = [x1 - q * x0, x0];
  }
  return x1 < 0 ? x1 + m0 : x1;
};

const generateKeys = () => {
  const p = generatePrime();
  const q = generatePrime();
  const n = p * q;
  const phi = (p - 1) * (q - 1);
  let e = 3;
  while (gcd(e, phi) !== 1) e++;

  const d = modInverse(e, phi);
  return { publicKey: { e, n }, privateKey: { d, n } };
};

const encrypt = (msg, publicKey) => {
  const m = bigInt(msg);
  const c = m.modPow(publicKey.e, publicKey.n);
  return c.toString();
};

const decrypt = (cipher, privateKey) => {
  const c = bigInt(cipher);
  const m = c.modPow(privateKey.d, privateKey.n);
  return m.toString();
};

module.exports = { generateKeys, encrypt, decrypt };
