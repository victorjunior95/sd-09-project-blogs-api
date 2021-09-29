const { Users } = require('../models');
const { generateToken } = require('../utils');

const INVALID_FIELDS = {
  status: 400,
  message: 'Invalid fields',
};
const NOT_FOUND_STATUS = {
  status: 404,
  message: 'User does not exist',
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

const getUser = async ({ id }) => {
  const user = await Users.findOne({ where: { id } });
  if (!user) throw NOT_FOUND_STATUS;
  return user;
};

const erase = async ({ id }) => {
  await Users.destroy({ where: { id } });
  const deletedUser = await Users.findOne({ where: { id } });
  if (!deletedUser) return true;
};

module.exports = {
  register,
  login,
  getAll,
  getUser,
  erase,
};
