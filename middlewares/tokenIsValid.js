const { validateToken } = require('../auth');

const tokenIsValid = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  const token = await validateToken(authorization);
  if (!token) return res.status(401).json({ message: 'Expired or invalid token' });
  
  return next();
};

module.exports = {
  tokenIsValid,
};