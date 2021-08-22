const rescue = require('express-rescue');
const Categories = require('../services/Categories');

const CREATED = 201;
// const OK = 200;

const create = rescue(async (req, res) => {
  const { name } = req.body;
  const category = await Categories.create(name);
  return res.status(CREATED).json(category);
});

module.exports = { create };
