const { BlogPosts, Users, Categories } = require('../models');

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

module.exports = {
  register,
  getAll,
};
