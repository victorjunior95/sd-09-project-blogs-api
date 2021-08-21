const joi = require('joi');
const { Users } = require('../models/index');

const validateNewUser = async (body) => {
  const { error } = joi.object({
    password: joi.string().length(6).required(),
    email: joi.string().email({ minDomainSegments: 2 }).required(),
    displayName: joi.string().min(8),
    image: joi.string().uri(),
  }).validate(body);

  const user = !error && await Users.findOne({ where: { email: body.email } });

  return (error && { status: 400, message: error.details[0].message })
    || (user && { status: 409, message: 'User already registered' });
};

const create = async (body) => {
  const newUser = await Users.create(body);
  
  return { status: 201, data: newUser };
};

module.exports = {
  validateNewUser,
  create,
};
