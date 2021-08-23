const JOI = require('joi');
const { Categories } = require('../models');

const validateInputData = (data) =>
  JOI.object({
    name: JOI.string().required(),
  }).validate(data);

const createCategory = async (data) => {
  const { error } = validateInputData(data);
  if (error) throw error.details[0].message;
  const result = await Categories.create(data);
  return result;
};

const getAllCategories = async () => Categories.findAll();

module.exports = {
  createCategory,
  getAllCategories,
};
