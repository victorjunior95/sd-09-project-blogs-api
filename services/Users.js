const { Users } = require('../models');
const { generateToken } = require('../utils');

const INVALID_FIELDS = {
  status: 400,
  message: 'Invalid fields',
};

const register = async (newUser) => {
  const { password, ...user } = await Users.create(newUser);

  return user;
};

const login = async ({ email, password: psw }) => {
  const userAlreadyRegistered = await Users.findOne({ where: { email, password: psw } });

  if (!userAlreadyRegistered) throw INVALID_FIELDS;

  const { password, ...user } = userAlreadyRegistered;
  return generateToken(user);
};

const getAll = async () => {
  const users = await Users.findAll();
  return users;
};

module.exports = {
  register,
  login,
  getAll,
};
