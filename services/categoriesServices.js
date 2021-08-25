const Joi = require('@hapi/joi');
const { Error400, Error500 } = require('../errors');

const { Category } = require('../models');

const categoryDataSchema = Joi.object({
  name: Joi.string().required(),
});

const add = async (categoryData) => {
  const { error } = categoryDataSchema.validate(categoryData);
  if (error) {
    const { message } = error.details[0];
    throw new Error400(message);
  }
  try {
    const response = await Category.create(categoryData);
    return response;
  } catch (err) {
    throw new Error500('Internal Error');
  }
};

module.exports = {
  add,
}; 