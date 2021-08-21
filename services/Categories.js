const { Categories } = require('../models');

const register = async (newCategory) => {
  const category = await Categories.create(newCategory);

  return category;
};

const getAll = async () => {
  const categories = await Categories.findAll();

  return categories;
};

module.exports = {
  register,
  getAll,
};
