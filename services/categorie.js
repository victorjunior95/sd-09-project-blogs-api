const { Categorie } = require('../models');

const create = async ({ name }) => {
  if (!name) {
    return {
      status: 400, 
      error: {
        message: '"name" is required',
      },
    };
  }
  const createCategorie = await Categorie.create({ name });

  return createCategorie;
};

const getAllCategories = async () => {
  const result = await Categorie.findAll();

  return result;
};

module.exports = {
  create,
  getAllCategories,
};