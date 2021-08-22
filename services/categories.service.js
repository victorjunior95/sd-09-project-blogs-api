const joi = require('joi');
const { Categories } = require('../models/index');

const validateNewCategorie = (body) => {
  const { error } = joi.object({
    name: joi.string().required(),
  }).validate(body);

  return error && { status: 400, data: { message: error.details[0].message } };
};

const create = async (body) => {
  const error = validateNewCategorie(body);

  if (error) return error;

  const categorie = await Categories.create(body);

  return { status: 201, data: categorie };
};

module.exports = {
  create,
};
