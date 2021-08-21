const blogPostServices = require('../services/blogPostServices');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user.dataValues;
  
  const response = await blogPostServices.create(title, content, categoryIds, id);

  return res.status(response.code).json(response.message);
};

const getAll = async (_req, res) => {
  const response = await blogPostServices.getAll();

  return res.status(response.code).json(response.message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await blogPostServices.getById(id);

  return res.status(response.code).json(response.message);
};

module.exports = {
  create,
  getAll,
  getById,
};