const joi = require('joi');
const boom = require('@hapi/boom');
const { BlogPost, Category, User } = require('../models');

const validatePostInputs = (title, content, categoryIds) => {
  const post = joi.object({
    title: joi.string().required(),
    content: joi.string().required(),
    categoryIds: joi.array().required(),
  });
  const { error } = post.validate({ title, content, categoryIds });
  return error;
};

const validateCategory = async (categoryIds) => {
  const categories = await Category.findOne({ where: { id: [...categoryIds] },
  });
  if (categories) return categories;
  return false;
};

const validateCreate = async (title, content, categoryIds) => {
  const invalidInputs = validatePostInputs(title, content, categoryIds);
  if (invalidInputs) throw invalidInputs;
  const validCategory = await validateCategory(categoryIds);
  if (!validCategory) throw boom.badRequest('"categoryIds" not found');
};

const create = async (title, content, categoryIds, user) => {
  await validateCreate(title, content, categoryIds);
  const userId = user.id;
  const post = await BlogPost.create({ title, content, categoryIds, userId });
  return post;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

module.exports = { create, getAll };
