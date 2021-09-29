const jwt = require('jsonwebtoken');

const { Users } = require('../models');

const UNAUTHORIZED_STATUS = 401;

const secret = process.env.JWT_SECRET || 'token';

const validateToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(UNAUTHORIZED_STATUS).json({ message: 'Token not found' });

    const decoded = jwt.verify(authorization, secret);

    const getAllUsers = await Users.findAll();

    const result = getAllUsers.find((user) => user.email === decoded.dataValues.email);

    if (!result) {
      return res.status(UNAUTHORIZED_STATUS).json({ message: 'Expired or invalid token' });
    }

    req.user = result;
  } catch (error) {
    return res.status(UNAUTHORIZED_STATUS).json({ message: 'Expired or invalid token' });
  }

  next();
};

module.exports = validateToken;
