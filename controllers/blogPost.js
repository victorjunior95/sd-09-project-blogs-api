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

const update = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user.dataValues;
  const { id } = req.params;
  const response = await blogPostServices.update({ id, title, content, categoryIds, userId });

  return res.status(response.code).json(response.message);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user.dataValues;
  const response = await blogPostServices.deletePost({ id, userId });

  if (response.message) return res.status(response.code).json(response.message);
  return res.status(response.code).json();
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deletePost,
};