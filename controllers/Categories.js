const categoryService = require('../services/Categories');

const OK_STATUS = 200;
const CREATED_STATUS = 201;

const registerCategories = (req, res) => categoryService.register(req.body)
  .then((newCategory) => res.status(CREATED_STATUS).json(newCategory));

const getAllCategories = (_req, res) => categoryService.getAll()
  .then((data) => res.status(OK_STATUS).json(data));

module.exports = {
  registerCategories,
  getAllCategories,
};
