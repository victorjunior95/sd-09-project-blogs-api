const Categorie = require('../services/categorie');

const create = async (req, res, next) => {
  const { name } = req.body;
  const newCategorie = await Categorie.create({ name });

  if (newCategorie.error) return next(newCategorie);

  res.status(201).json(newCategorie);
};

const getAllCategories = async (_req, res, _next) => {
  const allCategories = await Categorie.getAllCategories();

  res.status(200).send(allCategories);
};

module.exports = {
  create,
  getAllCategories,
};