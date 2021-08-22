const { BlogPost, Categorie, User } = require('../models');
const {
  validPost,
  validUpdate,
  VerifyIfNoIsCategoriesOnEdition,
} = require('../middlewares/validatePost');

const create = async ({ title, content, categoryIds, userId }) => {
  // valida as info do post
  const validateInfos = validPost(title, content, categoryIds);

  if (validateInfos) return validateInfos;

  // verifica as categorias
  const categoryId = await Categorie.findOne({ where: { id: categoryIds } });

  if (!categoryId) {
    return {
      status: 400, error: { message: '"categoryIds" not found' },
    };
  }
  
  const newPost = await BlogPost.create({ title, content, userId });
  delete newPost.dataValues.createdAt;
  delete newPost.dataValues.updatedAt;
  return newPost;
};

const getAllPosts = async () => {
  const result = await BlogPost.findAll({ 
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Categorie, as: 'categories', through: { attributes: [] } }],
  });

  return result;
};

const getPostById = async (id) => {
  const result = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!result) {
    return {
      status: 404, error: { message: 'Post does not exist' },
    };
  }

  return result;
};

const verifyUserAuth = async (id, userId) => {
  const post = await getPostById(id);
  // console.log(`esse é o id de quem postou ${post.user.id}`);
  // console.log(`esse é o id de quem atualizou ${userId}`);
  if (post.user.id !== userId) {
    return {
      status: 401, error: { message: 'Unauthorized user' },
    };
  }
};

const updatePost = async ({ id, title, content, categoryIds, userId }) => {
  // // valida se foi enviado categorias
  const validateIfIsCategories = await VerifyIfNoIsCategoriesOnEdition(categoryIds);

  if (validateIfIsCategories) return validateIfIsCategories;
  
  // // valida as info do post
  const validateInfos = validUpdate(title, content);
  
  if (validateInfos) return validateInfos;
// console.log(`esse é o id ${id}`);
// console.log(`esse é o ${userId}`);
  const verifyUser = await verifyUserAuth(id, userId);

  if (verifyUser) return verifyUser;

  await BlogPost.update({ title, content }, { where: { id } });
  const result = await BlogPost.findOne({ 
    where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });

  delete result.dataValues.id;
  delete result.dataValues.user;
  delete result.dataValues.published;
  delete result.dataValues.updated;

 return result;
};

const deletePost = async ({ id, userId }) => {
  const verifyUser = await verifyUserAuth(id, userId);
  if (verifyUser) return verifyUser;
  
  const result = await BlogPost.destroy({ where: { id } });
  
  if (!result) {
    return {
      status: 404, error: { message: 'Post does not exist' },
    };
  }

  return result;
};

module.exports = {
  create,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};