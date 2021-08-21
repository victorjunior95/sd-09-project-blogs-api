const { Categories } = require('../models');

const register = async (newCategory) => {
  const category = await Categories.create(newCategory);

  return category;
};

module.exports = {
  register,
};
