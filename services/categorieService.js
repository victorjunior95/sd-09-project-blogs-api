const { StatusCodes } = require('http-status-codes');
const JOI = require('joi');
const { Categories } = require('../models');

const validateInputData = (data) =>
  JOI.object({
    name: JOI.string().required(),
  }).validate(data);

const createCategory = async (data) => {
  const { error } = validateInputData(data);
  if (error) {
    return { isError: true,
     err: { message: error.details[0].message },
     status: StatusCodes.BAD_REQUEST,
    };
  } 
  
  const result = await Categories.create(data);
  return result;
};

const getAllCategories = async () => Categories.findAll();

module.exports = {
  createCategory,
  getAllCategories,
};
