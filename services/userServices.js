const { User } = require('../models');
const { generateToken, validateToken } = require('../auth');

const create = async (displayName, email, password, image) => {
  const userExists = await User.findOne({ where: { email } });
  const createSuccess = await User.create({ displayName, email, password, image });

  if (userExists) return { code: 409, message: { message: 'User already registered' } };
  if (createSuccess) return { code: 201, message: createSuccess };
  return {};
};

const loginService = async (email, password) => {
  const userExists = await User.findOne({ where: { email } });
  if (!userExists) return { code: 400, message: { message: 'Invalid fields' } };

  const token = generateToken(email, password);
  return { code: 200, message: { token } };
};

const getAllService = async (authorization) => {
  const result = await User.findAll();
  const tokenIsValid = await validateToken(authorization);
  if (!authorization) return { code: 401, message: { message: 'Token not found' } };
  if (!tokenIsValid) return { code: 401, message: { message: 'Expired or invalid token' } };
  return { code: 200, message: result };
};

module.exports = {
  create,
  loginService,
  getAllService,
};