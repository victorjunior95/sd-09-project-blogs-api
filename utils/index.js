const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'token';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = async (user) => {
  const token = jwt.sign(user, secret, jwtConfig);
  return { token };
};

module.exports = {
  generateToken,
};
