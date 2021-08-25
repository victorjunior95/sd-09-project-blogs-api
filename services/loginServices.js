const Joi = require('joi');

const createJWT = require('./jwt');
const { User } = require('../models');
const { Error400 } = require('../errors');

const createUserDataSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

const checkFields = (userData) => {
  const { error } = createUserDataSchema.validate(userData);
  if (error) {
    const { message } = error.details[0];
    throw new Error400(message);
  }
};

const login = async (loginData) => {
  checkFields(loginData);
  try {
    const response = await User.findOne({ where: { email: loginData.email } });
    const token = createJWT(response.toJSON());
    return token;
  } catch (_err) {
    throw new Error400('Invalid fields');
  }
};

module.exports = {
  login,
};