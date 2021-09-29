const Joi = require('joi');

const loginSchema = Joi.object().keys({
  email: Joi.string().not().empty().email()
    .required(),
  password: Joi.string().length(6).not().empty()
    .required(),
});

const validateLogin = async (req, res, next) => {
  const user = req.body;
  const { error } = loginSchema.validate(user);

  if (error) return next(error);

  return next();
};

module.exports = validateLogin;
