const { Category } = require('../models');
const CategoryServices = require('../services/categoriesServices');

const add = async (req, res) => {
  const { body } = req;
  const response = await CategoryServices.add(body);
  res.status(201).json(response);
};

const getAll = async (req, res) => {
  try {
    const response = await Category.findAll();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: 'Internal Error' });
  }
};

module.exports = {
  add,
  getAll,
};