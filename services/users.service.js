const joi = require('joi');
const { Users } = require('../models/index');
const { generateToken } = require('./token.service');

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

const validateLogin = (body) => {
  const { error } = joi.object({
    password: joi.string().length(6).required(),
    email: joi.string().email({ minDomainSegments: 2 }).required(),
  }).validate(body);

  return error && { status: 400, data: { message: error.details[0].message } };
};

const login = async (body) => {
  const error = validateLogin(body);

  if (error) return error;

  const user = await Users.findOne({ where: { email: body.email }, raw: true });

  if (!user || user.password !== body.password) {
    return { status: 400, data: { message: 'Invalid fields' } };
  }

  delete user.password;

  return { status: 200, data: { token: generateToken(user) } };
};

const list = async () => {
  const users = await Users.findAll({ attributes: { exclude: ['password'] } });

  return { status: 200, data: users };
};

module.exports = {
  validateNewUser,
  create,
  login,
  list,
};
