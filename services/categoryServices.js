const { Category } = require('../models');

const create = async (name) => {
  if (!name) return { code: 400, message: { message: '"name" is required' } };
  const createSuccess = await Category.create({ name });

  if (createSuccess) return { code: 201, message: createSuccess };
  return {};
};

module.exports = {
  create,
};