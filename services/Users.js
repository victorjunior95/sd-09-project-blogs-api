const { Users } = require('../models');

const register = async (newUser) => {
  const { password, ...user } = await Users.create(newUser);

  return user;
};

module.exports = {
  register,
};
