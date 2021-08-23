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

module.exports = { create, getAll };
