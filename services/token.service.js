const jwt = require('jsonwebtoken');

const secret = 'sd-09-trybe-regoraphael';

const config = { expiresIn: '1d', algorithm: 'HS256' };

const generateToken = (payload) => jwt.sign({ payload }, secret, config);

module.exports = {
  generateToken,
};
