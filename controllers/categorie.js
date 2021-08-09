const { Router } = require('express');

const { Categories } = require('../models');
const { categorieVal } = require('../middlewares/categoriePost');
const { validateToken } = require('../helpers/jwt');

const router = new Router();

router.post('/', categorieVal, validateToken, async (req, res) => {
  const { name } = req.body;

  const category = await Categories.create({ name });

  res.status(201).json({ ...category.dataValues, name });
});

router.get('/', validateToken, async (_req, res) => {
  const categories = await Categories.findAll({});

  return res.status(200).json(categories);
});

module.exports = router;