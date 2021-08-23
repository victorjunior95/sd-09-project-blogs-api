const JOI = require('joi');
const { BlogPosts, Categories, Users, PostsCategories } = require('../models');

const validateNewPostInputs = (data) => {
  const validation = JOI.object({
    title: JOI.string().required(),
    content: JOI.string().required(),
    categoryIds: JOI.array().required(),
  }).validate(data);
  if (validation.error) throw validation.error.details[0].message;
};

const validateEditPostInputs = (data) => {
  const error = 'Categories cannot be edited';
  if (data.categoryIds) throw error;

  const validation = JOI.object({
    title: JOI.string().required(),
    content: JOI.string().required(),
  }).validate(data);

  if (validation.error) throw validation.error.details[0].message;
};

const checkPostOwner = async (postId, userId) => {
  const unauthorized = 'Unauthorized user';
  const inexistent = 'Post does not exist';
  const post = await BlogPosts.findByPk(postId);
  if (post === null) throw inexistent;
  if (post.dataValues.userId !== userId) throw unauthorized;
};

const validateCategories = async (categories) => {
  const error = '"categoryIds" not found';
  const validCategories = await Categories.findAll();
  const categoriesId = validCategories.map((item) => item.id);
  const validCategory = categories.every((id) => categoriesId.includes(id));
  if (!validCategory) throw error;
};

const createPostCategories = async (categoryId, postId) => {
  await categoryId.map((id) => PostsCategories.create({ categoryId: id, postId }));
};

const createPost = async (data, user) => {
  validateNewPostInputs(data);
  const { id } = user;
  const { title, content, categoryIds } = data;
  await validateCategories(categoryIds);
  const result = await BlogPosts.create({
    title,
    content,
    userId: id,
    published: Date(),
  });
  await createPostCategories(categoryIds, result.id);
  return result;
};

const getAllPosts = async () =>
  BlogPosts.findAll({
    include: [
      { model: Categories, as: 'categories', through: { attributes: [] } },
      { model: Users, as: 'user' },
    ],
  });

const getPostById = async (id) => {
  const post = await BlogPosts.findOne({
    where: { id },
    include: [
      
      { model: Categories, as: 'categories', through: { attributes: [] } },
      { model: Users, as: 'user' },
    ],
  });
  if (post === null) throw new Error('Post does not exist');
  return post;
};

const updatePostById = async (id, data, user) => {
  validateEditPostInputs(data);
  await checkPostOwner(id, user.dataValues.id);
  const { title, content } = data;
  await BlogPosts.update({ title, content, updated: Date() }, { where: { id } });
  const updatedPost = await BlogPosts.findByPk(id, {
    include: [{ model: Categories, as: 'categories', through: { attributes: [] } }],
  });
  return updatedPost;
};

const deletePost = async (id, user) => {
  const error = 'Not deleted';
  await checkPostOwner(id, user.dataValues.id);
  const result = await BlogPosts.destroy({ where: { id } });
  if (result !== 1) throw error;
};

const searchPosts = async (searchTerm) => {
  const posts = await BlogPosts.findAll({
  include: 
    [{ model: Categories, as: 'categories', through: { attributes: [] } },
     { model: Users, as: 'user' }] });
  const filteredPosts = posts.filter((post) =>
   post.dataValues.title.includes(searchTerm) || post.dataValues.content.includes(searchTerm));
  console.log(filteredPosts);
  return filteredPosts;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePost,
  searchPosts,
};