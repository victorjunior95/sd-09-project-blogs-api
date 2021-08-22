const { create, list, getById, update, deletePost } = require('../services/posts.service');

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

const updatePost = async (req, res) => {
  try {
    const { params: { id, loggedUserId }, body } = req;
    const { status, data } = await update(id, body, loggedUserId);

    return res.status(status).json(data);
  } catch (err) { return res.status(400).json(err); }
};

const deletePostById = async (req, res) => {
  try {
    const { id, loggedUserId } = req.params;
    const { status, data } = await deletePost(id, loggedUserId);

    return data ? res.status(status).json(data) : res.status(status).send();
  } catch (err) { return res.status(400).json(err); }
};

module.exports = {
  createPost,
  listPosts,
  getPostById,
  updatePost,
  deletePostById,
};
