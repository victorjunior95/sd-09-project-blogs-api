const BlogPost = require('../services/blogPost');

const create = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { userId } = req;

  const result = await BlogPost.create({ title, content, categoryIds, userId });

  if (result.error) return next(result);
  
  res.status(201).json(result);
};

const getAllPosts = async (_req, res, _next) => {
  const allPosts = await BlogPost.getAllPosts();

  res.status(200).send(allPosts);
};

const getPostById = async (req, res, next) => {
  const { id } = req.params;

  const post = await BlogPost.getPostById(id);

  if (post.error) return next(post);

  res.status(200).json(post);
};

const update = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { userId } = req;
  const { id } = req.params;

  const result = await BlogPost.updatePost({ id, title, content, categoryIds, userId });

  if (result.error) return next(result);
// console.log(result);
  res.status(200).json(result);
};

module.exports = {
  create,
  getAllPosts,
  getPostById,
  update,
};