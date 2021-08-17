require('dotenv');

const jwt = require('jsonwebtoken');

const SECRET = 'segredo';

const generateToken = (email, password) => {
  const jwtConfig = {
    expiresIn: '3d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ email, password }, SECRET, jwtConfig);
  return token;
};

module.exports = {
  generateToken,
};