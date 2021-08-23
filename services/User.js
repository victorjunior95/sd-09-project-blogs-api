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

const validateLoginInputs = (email, password) => {
  // console.log('entrou na função "validateLoginInputs"');
  const login = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });
  const { error } = login.validate({ email, password });
  // console.log(`error na função "validateLoginInputs": ${error}`);
  return error;
};

const userExists = async (email) => {
  // console.log('entrou na função "userExists"');
  const user = await User.findOne({ where: { email } });
  // console.log(`user na função "userExists": ${user}`);
  if (user) return user;
  return false;
};

const validateCreate = async (displayName, email, password) => {
  const invalidInputs = validateUserInputs(displayName, email, password);
  if (invalidInputs) throw invalidInputs;
  const exists = await userExists(email);
  if (exists) throw boom.conflict('User already registered');
};

const generateToken = (id, displayName, email) => {
  // console.log('entrou na função "generateToken"');
  const secret = 'segredosupersecreto';
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: { id, displayName, email } }, secret, jwtConfig);
  // console.log(`token na função "generateToken": ${token}`);
  return token;
};

const create = async (displayName, email, password, image) => {
  await validateCreate(displayName, email, password);
  const user = await User.create({ displayName, email, password, image });
  const token = generateToken(user.id, user.displayName, user.email);
  return token;
};

const loginCorrect = async (email, password) => {
  // console.log('entrou na função "loginCorrect"');
  const exists = await userExists(email);
  // console.log(`exists na função "loginCorrect": ${exists}`);
  if (exists && exists.password === password) {
    return exists;
  }
  return false;
};

const validateLogin = async (email, password) => {
  // console.log('entrou na função "validateLogin"');
  const invalidInputs = validateLoginInputs(email, password);
  // console.log(`invalidInputs na função "validateLogin": ${invalidInputs}`);
  if (invalidInputs) throw invalidInputs;
  const correct = await loginCorrect(email, password);
  // console.log(`correct na função "validateLogin": ${correct}`);
  if (!correct) throw boom.badRequest('Invalid fields');
  return correct;
};

const login = async (email, password) => {
  // console.log('entrou na função "login"');
  await validateLogin(email, password);
  const user = await userExists(email);
  // console.log(`user na função login: ${user}`);
  const token = generateToken(user.id, user.displayName, user.email);
  // console.log(`token na função login: ${token}`);
  return token;
};

const formatUsers = ({ id, displayName, email, _password, image }) => ({ 
  id,
  displayName,
  email,
  image,
});

const getAll = async () => {
  const users = await User.findAll();
  return users.map(formatUsers);
};

const getById = async (id) => {
  const user = await User.findOne({ where: { id } });
  if (!user) throw boom.notFound('User does not exist');
  return user;
};

const deleteMe = async (user) => {
  const { id } = user;
  await User.destroy({ where: { id } });
};

module.exports = { create, login, getAll, getById, deleteMe };
