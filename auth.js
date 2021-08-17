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

const validateToken = async (authorization) => {
  try {
    jwt.verify(authorization, SECRET);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = {
  generateToken,
  validateToken,
};