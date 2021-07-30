const { User } = require('../../models');

const getUserByEmail = async (email) => {
  const myUser = await User.findOne({ where: { email } });

  return myUser;
};

const postNewUser = async (userData) => {
  const foundUser = await getUserByEmail(userData.email);

  if (foundUser) return;

  const newUser = await User.create(userData);
  return newUser;
  // console.log(newUser);
};

const getAllUsers = async () => {
  const allUsers = User.findAll();

  return allUsers;
};

const getUserById = async (id) => {
  const myUser = User.findOne({ where: { id } });

  return myUser;
};

module.exports = {
  postNewUser,
  getAllUsers,
  getUserById,
};