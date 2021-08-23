const rescue = require('express-rescue');
const Categories = require('../services/Categories');

const CREATED = 201;
const OK = 200;

const create = rescue(async (req, res) => {
  const { name } = req.body;
  const category = await Categories.create(name);
  return res.status(CREATED).json(category);
});

const getAll = rescue(async (_req, res) => {
  const categories = await Categories.getAll();
  return res.status(OK).json(categories);
});

module.exports = { create, getAll };
