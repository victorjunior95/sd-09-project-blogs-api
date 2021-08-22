const joi = require('joi');
const { Category } = require('../models');

const validateCategoryInputs = (name) => {
  const category = joi.object({
    name: joi.string().required(),
  });
  const { error } = category.validate({ name });
  return error;
};

const create = async (name) => {
  const invalidInput = validateCategoryInputs(name);
  if (invalidInput) throw invalidInput;
  const category = await Category.create({ name });
  return category;
};

module.exports = { create };
