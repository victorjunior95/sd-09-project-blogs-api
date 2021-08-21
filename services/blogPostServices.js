const { BlogPost, Category, User } = require('../models');

const isBlank = (value) => (!value);

const validatePost = (title, content, categoryIds) => {
  if (isBlank(title)) return { code: 400, message: { message: '"title" is required' } };
  if (isBlank(content)) return { code: 400, message: { message: '"content" is required' } };
  if (isBlank(categoryIds)) return { code: 400, message: { message: '"categoryIds" is required' } };
  return {};
};

const create = async (title, content, categoryIds, userId) => {
  const isValid = validatePost(title, content, categoryIds);
  if (isValid.message) return isValid;
  const categoryId = await Category.findOne({ where: { id: categoryIds } });
  if (!categoryId) return { code: 400, message: { message: '"categoryIds" not found' } };

  const createSuccess = await BlogPost.create({ title, content, userId });
  delete createSuccess.dataValues.createdAt;
  delete createSuccess.dataValues.updatedAt;
  if (createSuccess) return { code: 201, message: createSuccess };
  return {};
};

const getAll = async () => {
  const result = await BlogPost.findAll({ 
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  return { code: 200, message: result };
};

module.exports = {
  create,
  getAll,
};