const { User } = require('../models');

module.exports = async (req, _res, next) => {
  if (!req.body.email) return next();
  try {
    const doesEmailAlreadyExists = await User.findOne({ where: { email: req.body.email } });
    if (doesEmailAlreadyExists) {
      const err = new Error('User already registered');
      err.statusCode = 409;
      return next(err);
    }
  } catch (error) {
    next(error);
  }

  next();
};
