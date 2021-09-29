const Joi = require('joi');
const { Op } = require('sequelize');

const { Categories } = require('../models');

const CATEGORY_NOT_FOUND = {
  status: 400,
  message: '"categoryIds" not found',
};

const blogPostSchema = Joi.object().keys({
  title: Joi.string().not().empty().required(),
  content: Joi.string().not().empty().required(),
  categoryIds: Joi.array().items(Joi.number()).not().empty()
  .required(),
});

const verifyCategoryAlreadyExists = async (categoryIds) => {
  const categoryAlreadyExists = await
    Categories.findAll({ where: { id: { [Op.in]: categoryIds } } });
  if (categoryAlreadyExists.length === categoryIds.length) return true;

  return false;
};

const validatePost = async (req, res, next) => {
  const newPost = req.body;
  const { error } = blogPostSchema.validate(newPost);
  if (error) return next(error);

  const categoryAlreadyExists = await verifyCategoryAlreadyExists(newPost.categoryIds);
  if (!categoryAlreadyExists) throw CATEGORY_NOT_FOUND;

  return next();
};

module.exports = validatePost;
