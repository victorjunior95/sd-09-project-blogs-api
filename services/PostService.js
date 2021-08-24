const { BlogPost, PostCategory, User, Category } = require('../models');

const createPost = async (title, content, userId) => {
  const post = await BlogPost.create({ title, content, userId })
    .then((newPost) => newPost.dataValues)
    .catch((error) => error);
  return post;
};

const createPostCategory = async (categoryIds, postId) => {
  categoryIds.forEach((categoryId) => {
    PostCategory.create({ categoryId, postId });
  });
};

const getAllPosts = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { excludes: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return allPosts;
};

const getPostById = async (id) => {
  const postById = await BlogPost.findByPk((id), {
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return postById;
};

module.exports = { 
  createPost,
  createPostCategory,
  getAllPosts,
  getPostById,
}; 