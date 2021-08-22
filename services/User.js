const boom = require('@hapi/boom');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const validateUserInputs = (displayName, email, password) => {
  const user = joi.object({
    displayName: joi.string().min(8),
    email: joi.string().email().required(),
    password: joi
      .string()
      .min(6)
      .message('{#label} length must be 6 characters long')
      .required(),
  });
  const { error } = user.validate({ displayName, email, password });
  return error;
};

const userExists = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) return true;
  return false;
};

const validateCreate = async (displayName, email, password) => {
  const invalidInputs = validateUserInputs(displayName, email, password);
  if (invalidInputs) throw invalidInputs;
  const exists = await userExists(email);
  if (exists) throw boom.conflict('User already registered');
};

const generateToken = (id, displayName, email) => {
  const secret = 'segredosupersecreto';
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: { id, displayName, email } }, secret, jwtConfig);
  return token;
};

const create = async (displayName, email, password, image) => {
  await validateCreate(displayName, email, password);
  const user = await User.create({ displayName, email, password, image });
  const token = generateToken(user.id, user.displayName, user.email);
  return token;
};

module.exports = { create };
