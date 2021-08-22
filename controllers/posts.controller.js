const { list, getById } = require('../services/posts.service');
const { create } = require('../services/posts.service');

const createPost = async (req, res) => {
  try {
    const { body, params: { loggedUserId } } = req;
    const { status, data } = await create(body, loggedUserId);
  
    return res.status(status).json(data);
  } catch (err) { return res.status(400).json(err); }
};

const listPosts = async (_req, res) => {
  try {
    const { status, data } = await list();
  
    return res.status(status).json(data);
  } catch (err) { return res.status(400).json(err); }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, data } = await getById(id);
  
    return res.status(status).json(data);
  } catch (err) { return res.status(400).json(err); }
};

module.exports = {
  createPost,
  listPosts,
  getPostById,
};
