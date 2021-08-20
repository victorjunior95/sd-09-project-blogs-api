const jwt = require('jsonwebtoken');
const { validateToken } = require('../auth');
const { User } = require('../models');

const tokenIsValid = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  const token = await validateToken(authorization);
  if (!token) return res.status(401).json({ message: 'Expired or invalid token' });
  const extractToken = jwt.verify(authorization, 'segredo');
  const user = await User.findOne({ where: { email: extractToken.email } });

  req.user = user;
  return next();
};

module.exports = {
  tokenIsValid,
};
