const Joi = require('joi');

const { Users } = require('../models');

// const BAD_REQUEST_STATUS = 400;
const CONFLICT_ERROR = {
  status: 409,
  message: 'User already registered',
};

const userSchema = Joi.object().keys({
  displayName: Joi.string().min(8).not().empty()
    .required(),
  email: Joi.string().not().empty().email()
    .required(),
  password: Joi.string().length(6).not()
    .empty()
    .required(),
  image: Joi.string(),
});

const verifyIfEmailAlreadyExists = async (email) => {
  const emailAlreadyExists = await Users.findOne({ where: { email } });
  return emailAlreadyExists;
};

const validateBody = async (req, res, next) => {
  const newUser = req.body;
  const { error } = userSchema.validate(newUser);
  console.log(error);

  if (error) {
    return next(error);
  }

  const emailAlreadyExists = await verifyIfEmailAlreadyExists(req.body.email);
  // se retornar true next(error);
  // if (emailAlreadyExists) return next(error);
  if (emailAlreadyExists) throw CONFLICT_ERROR;

  return next();
};

module.exports = validateBody;
