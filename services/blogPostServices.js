const { userIsValid } = require('../middlewares/userIsValid');
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

const getById = async (id) => {
  const result = await BlogPost.findOne({ 
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!result) return { code: 404, message: { message: 'Post does not exist' } };
  return { code: 200, message: result };
};

const categoryCheck = (categoryIds) => {
  if (categoryIds) {
    return { code: 400, message: { message: 'Categories cannot be edited' } };
  }
  return {};
};

const userIsAuthorized = async (userId, postId) => {
  const { dataValues } = await BlogPost.findOne({ 
    where: { id: postId },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    fields: ['userId'],
  });

  if (dataValues.id !== userId) {
    return { code: 400, message: { message: 'Unauthorized user' } };
  }

  return {};
};

const update = async ({ id, title, content, categoryIds, userId }) => {
  const category = categoryCheck(categoryIds);
  if (category.message) return category;
  const user = await userIsAuthorized(userId, id);
  if (user.message) return user;
  await BlogPost.update({ title, content }, { where: { id } });
  const result = await BlogPost.findOne({ 
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  delete result.dataValues.id;
  delete result.dataValues.user;
  delete result.dataValues.published;
  delete result.dataValues.updated;
  return { code: 200, message: result };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};