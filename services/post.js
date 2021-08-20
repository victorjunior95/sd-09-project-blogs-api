const jwt = require('jsonwebtoken');

const { newPostValidate } = require('../validation/post');
const Utils = require('../validation/throw');
const { BlogPost: BlogPostModel,
    PostCategorie: PostCategorieModel,
    Categorie: CategorieModel } = require('../models');

const JWT_SECRET = 'senha';

const create = async (token, title, content, categoryIds) => {
  const { error } = newPostValidate.validate({ title, content, categoryIds });
  // console.log(error, 'erro do joi');
  if (error) Utils.throwError(error, 400);
  const categories = await Utils.categoryExists(categoryIds, CategorieModel);
  if (categories.includes(null)) Utils.throwError(new Error(), 400, '"categoryIds" not found');
  const { id: userId } = jwt.verify(token, JWT_SECRET);
  const { id: postId } = await BlogPostModel.create({ title, content, userId });
  const post = {
    id: postId,
    userId,
    title,
    content,
  };
  await Utils.postCategorie(postId, PostCategorieModel, categories);
  return {
    statusCode: 201,
    post,
  };
};

module.exports = {
  create,
};