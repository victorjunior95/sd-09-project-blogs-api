const joi = require('joi');

const newPostValidate = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  categoryIds: joi.required(),
});

module.exports = {
  newPostValidate,
};