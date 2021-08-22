const { BlogPosts } = require('../models');

const register = async (newPost, userId) => {
  const { title, content } = newPost;

  await BlogPosts.create({ title, content, userId });

  const blogPost = await BlogPosts.findOne({ where: { title, content, userId } });

  return blogPost;
};

module.exports = {
  register,
};
