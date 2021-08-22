const joi = require('joi');
const { Categories, BlogPosts, Users } = require('../models/index');

const validateNewPost = (body) => {
  const { error } = joi.object({
    title: joi.string().required(),
    content: joi.string().required(),
    categoryIds: joi.array().items(joi.number()).required(),
  }).validate(body);

  return error && { status: 400, data: { message: error.details[0].message } };
};

const validateUpdatePost = (body) => {
  const { error } = joi.object({
    title: joi.string().required(),
    content: joi.string().required(),
    categoryIds: joi.array().items(joi.number()).optional(),
  }).validate(body);

  return error && { status: 400, data: { message: error.details[0].message } };
};

const create = async (body, userId) => {
  const error = validateNewPost(body);

  if (error) return error;

  const categorieCount = await Categories.count({ where: { id: body.categoryIds } });

  if (categorieCount !== body.categoryIds.length) {
    return { status: 400, data: { message: '"categoryIds" not found' } };
  }

  const post = await BlogPosts.create({ ...body, userId });

  await post.setCategories(body.categoryIds);

  return { status: 201, data: post };
};

const list = async () => {
  const posts = await BlogPosts.findAll({
    include: [
      { model: Users, as: 'user' },
      { model: Categories, as: 'categories' },
    ],
  });

  return { status: 200, data: posts };
};

const getById = async (id) => {
  const post = await BlogPosts.findByPk(id, {
    include: [
      { model: Users, as: 'user' },
      { model: Categories, as: 'categories' },
    ],
  });

  if (!post) return { status: 404, data: { message: 'Post does not exist' } };

  return { status: 200, data: post };
};

const update = async (postId, body, userId) => {
  const error = validateUpdatePost(body);

  if (error) return error;

  if (body.categoryIds) return { status: 400, data: { message: 'Categories cannot be edited' } };

  const post = await BlogPosts.findByPk(postId, {
    include: [
      { model: Categories, as: 'categories' },
    ],
  });

  if (post.dataValues.userId !== userId) {
    return { status: 401, data: { message: 'Unauthorized user' } };
  }

  await post.update(body);
  return { status: 200, data: post };
};

module.exports = {
  create,
  list,
  getById,
  update,
};
