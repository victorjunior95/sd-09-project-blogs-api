const rescue = require('express-rescue');
const Post = require('../services/Post');

const CREATED = 201;
const OK = 200;

const create = rescue(async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { user } = req;
  const post = await Post.create(title, content, categoryIds, user);
  return res.status(CREATED).json(post);
});

const getAll = rescue(async (_req, res) => {
  const posts = await Post.getAll();
  return res.status(OK).json(posts);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const post = await Post.getById(id);
  return res.status(OK).json(post);
});

const editOne = rescue(async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const info = req.body;
  const edited = await Post.editOne(id, user, info);
  res.status(OK).json(edited);
});

module.exports = { create, getAll, getById, editOne };
