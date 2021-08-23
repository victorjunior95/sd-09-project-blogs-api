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

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!post) throw boom.notFound('Post does not exist');
  return post;
};

const validateEditInputs = (info) => {
  const { title, content } = info;
  const edit = joi.object({
    title: joi.string().required(),
    content: joi.string().required(),
  });
  const { error } = edit.validate({ title, content });
  return error;
};

const validateEdit = async (id, user, info) => {
  const post = await getById(id);
  if (post.userId !== user.id) throw boom.unauthorized('Unauthorized user');
  if (info.categoryIds) throw boom.badRequest('Categories cannot be edited');
  const invalidInputs = validateEditInputs(info);
  if (invalidInputs) throw invalidInputs;
};

const editOne = async (id, user, info) => {
  await validateEdit(id, user, info);
  const { title, content } = info;
  await BlogPost.update({ title, content }, { where: { id } });
  const edited = await BlogPost.findByPk(id, {
    attributes: { exclude: ['published', 'updated', 'id'] },
    include: { model: Category, as: 'categories', through: { attributes: [] } },
  });
  return edited;
};

module.exports = { create, getAll, getById, editOne };
