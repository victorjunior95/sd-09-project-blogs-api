const { BlogPosts, Users, Categories } = require('../models');

const NOT_FOUND_STATUS = {
  status: 404,
  message: 'Post does not exist',
};

const register = async (newPost, userId) => {
  const { title, content } = newPost;

  await BlogPosts.create({ title, content, userId });

  const blogPost = await BlogPosts.findOne({ where: { title, content, userId } });

  return blogPost;
};

const getAll = async () => {
  const blogPosts = await BlogPosts.findAll({ include: [
    { model: Users, as: 'user' },
    { model: Categories, as: 'categories' },
  ] });
  return blogPosts;
};

const getPost = async ({ id }) => {
  const blogPost = await BlogPosts.findOne({
    where: { id },
    include: [
    { model: Users, as: 'user' },
    { model: Categories, as: 'categories' },
  ] });
  if (!blogPost) throw NOT_FOUND_STATUS;
  return blogPost;
};

const update = async (post, updateInfo) => {
  const { title, content } = updateInfo;
  const { id } = post;

  await BlogPosts.update({ title, content }, { where: { id } });

  const updatedPost = await getPost(post);
  return updatedPost;
};

module.exports = {
  register,
  getAll,
  getPost,
  update,
};
