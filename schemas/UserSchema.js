const { User } = require('../models');

const errors = {
  nameLength: '"displayName" length must be at least 8 characters long',
  emailExists: 'User already registered',
  invalidEmail: '"email" must be a valid email',
  blankEmail: '"email" is required',
  passwordLength: '"password" length must be 6 characters long',
  blankPassword: '"password" is required',
  emptyPassword: '"password" is not allowed to be empty',
  emptyEmail: '"email" is not allowed to be empty',
};

const status = {
  created: 201,
  badRequest: 400,
  conflict: 409,
};

const isBlank = (value) => (!value);
const isLessThan = (value, min) => (value.length < min);
const isNotEmail = (value) => {
  const emailValidation = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
  return !emailValidation.test(value);
};
const alreadyExists = async (value) => {
  const result = await User.findOne({ where: { value } });
  if (result) return { code: status.conflict, message: errors.emailExists };
  return false;
};

const nameError = (displayName) => {
  if (isLessThan(displayName, 8)) return { code: status.badRequest, message: errors.nameLength };
  return {};
};

const emailError = (email) => {
  if (isBlank(email)) return { code: status.badRequest, message: errors.blankEmail };
  if (isNotEmail(email)) return { code: status.badRequest, message: errors.invalidEmail };
  return {};
};

const passwordError = (password) => {
  if (isBlank(password)) return { code: status.badRequest, message: errors.blankPassword };
  if (isLessThan(password, 6)) return { code: status.badRequest, message: errors.passwordLength };
  return {};
};

const validate = (displayName, email, password) => {
  if (nameError(displayName).message) return nameError(displayName);
  if (emailError(email).message) return emailError(email);
  if (passwordError(password).message) return passwordError(password);
  return {};
};

const validateLogin = (email, password) => {
  if (email === '') return { code: status.badRequest, message: errors.emptyEmail };
  if (password === '') return { code: status.badRequest, message: errors.emptyPassword };
  if (isBlank(email)) return { code: status.badRequest, message: errors.blankEmail };
  if (isBlank(password)) return { code: status.badRequest, message: errors.blankPassword };
  return {};
};

module.exports = {
  validate,
  alreadyExists,
  validateLogin,
};