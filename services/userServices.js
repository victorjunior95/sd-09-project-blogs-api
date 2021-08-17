const { User } = require('../models');

const create = async (displayName, email, password, image) => {
  const userExists = await User.findOne({ where: { email } });
  const createSuccess = await User.create({ displayName, email, password, image });

  if (userExists) return { code: 409, message: { message: 'User already registered' } };
  if (createSuccess) return { code: 201, message: createSuccess };
  return {};
};

module.exports = {
  create,
};