const { BlogPost, Category } = require('../models');

const create = async (title, content, categoryIds, userId) => {
  /*
  if (!title) return { code: 400, message: { message: '"title" is required' } };
  if (!content) return { code: 400, message: { message: '"content" is required' } };
  if (!categoryIds) return { code: 400, message: { message: '"categoryIds" is required' } };
  */
  const categoryId = await Category.findOne({ where: { id: categoryIds } });
  if (!categoryId) return { code: 400, message: { message: '"categoryIds" not found' } };

  const createSuccess = await BlogPost.create({ title, content, userId });

  if (createSuccess) return { code: 201, message: createSuccess };
  return {};
};

const getAll = async () => {
  const result = await BlogPost.findAll();
  return { code: 200, message: result };
};

module.exports = {
  create,
  getAll,
};