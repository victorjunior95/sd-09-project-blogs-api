const { User } = require('../models');
const { generateToken } = require('../auth');

const create = async (displayName, email, password, image) => {
  const userExists = await User.findOne({ where: { email } });
  const createSuccess = await User.create({ displayName, email, password, image });

  if (userExists) return { code: 409, message: { message: 'User already registered' } };
  if (createSuccess) return { code: 201, message: createSuccess };
  return {};
};

const login = async (email, password) => {
  const userExists = await User.findOne({ where: { email } });
  if (!userExists) return { code: 400, message: { message: 'Invalid fields' } };

  const token = generateToken(email, password);
  return { code: 200, message: { token } };
};

const getAll = async () => {
  const result = await User.findAll();
  return { code: 200, message: result };
};

const getById = async (id) => {
  const result = await User.findByPk(id);
  if (!result) return { code: 404, message: { message: 'User does not exist' } };
  return { code: 200, message: result };
};

module.exports = {
  create,
  login,
  getAll,
  getById,
};