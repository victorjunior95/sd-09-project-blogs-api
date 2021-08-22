const joi = require('joi');
const { Categories, BlogPosts } = require('../models/index');

const validateNewPost = (body) => {
  const { error } = joi.object({
    title: joi.string().required(),
    content: joi.string().required(),
    categoryIds: joi.array().items(joi.number()).required(),
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

  return { status: 201, data: post };
};

module.exports = {
  create,
};
