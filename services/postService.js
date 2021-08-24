const Joi = require('joi');
const { BlogPosts, Categories, Users, PostsCategories } = require('../models');

const validateNewPostInputs = (data) => {
  const validation = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  }).validate(data);
  if (validation.error) {
 return { 
    isError: true, err: { message: validation.error.details[0].message }, status: 400 };
} 
};  

 const validateEditPostInputs = (data) => {
   const error = 'Categories cannot be edited';
   if (data.categoryIds) return { isError: true, err: { message: error }, status: 400 };

   const validation = Joi.object({
     title: Joi.required(),
     content: Joi.required(),
   }).validate(data);

   if (validation.error) {
  return {
      isError: true,
      err: { message: validation.error.details[0].message },
      status: 400,     
   }; 
 }
 };

const checkPostOwner = async (postId, userId) => {
  const unauthorized = 'Unauthorized user';
  const inexistent = 'Post does not exist';
  const post = await BlogPosts.findByPk(postId);
  if (post === null) {
  return {
    isError: true,
    err: { message: inexistent },
    status: 404,
  };
}
  if (post.dataValues.userId !== userId) {
   return { isError: true, err: { message: unauthorized }, status: 401 };
  }
};
 const validateCategories = async (categories) => {
   const notFound = 'CategoriescategoryIds" not found';
   const validCategories = await Categories.findAll();
 
   if (categories === undefined) {
 return { isError: true,
          err: { message: notFound },
           code: 400 }; 
}
   const categoriesId = validCategories.map((item) => item.id);
   const validCategory = categories.every((id) => categoriesId.includes(id));
   if (!validCategory) {
      return {
     isError: true,
     error: { message: notFound },
     code: 400,
   };
 }
 };
//  const validateCategorie = async (categoryIds) => {
//    const categories = await Categories.findAll({ raw: true });
//    const CategoryId = categories.map(({ id }) => id);
//    return categoryIds.every((category) => CategoryId.includes(category));
//  };

 const createPostCategories = async (categoryId, postId) => {
   await categoryId.map((id) => PostsCategories.create({ categoryId: id, postId }));
 };

const createPost = async (data, user) => {
 const checkValidatePost = validateNewPostInputs(data);
   if (checkValidatePost) { return checkValidatePost; }
  const { id } = user;
 const { title, content, categoryIds } = data;
 const ReturnValidateCategories = await validateCategories(categoryIds);
 
  if (ReturnValidateCategories) { return ReturnValidateCategories; } 
 const result = await BlogPosts.create({
    title,
    content,
    userId: id,
    published: Date(),
  });
   await createPostCategories(categoryIds, result.id);
  return result;
};

const getAllPosts = async () =>
  BlogPosts.findAll({
    include: [
      { model: Categories, as: 'categories', through: { attributes: [] } },
      { model: Users, as: 'user' },
    ],
  });

const getPostById = async (id) => {
  const post = await BlogPosts.findOne({
    where: { id },
    include: [
      
      { model: Categories, as: 'categories', through: { attributes: [] } },
      { model: Users, as: 'user' },
    ],
  });
  if (post === null) {
 return { isError: true,
err: { message: 'Post does not exist' },
   status: 404 }; 
}
  return post;
};

 const updatePostById = async (id, data, user) => {
  const returnValidate = validateEditPostInputs(data);
  if (returnValidate) { return returnValidate; }
  const returnPost = await checkPostOwner(id, user.dataValues.id);
  if (returnPost) { return returnPost; }
   const { title, content } = data;
   await BlogPosts.update({ title, content, updated: Date() }, { where: { id } });
   const updatedPost = await BlogPosts.findByPk(id, {
     include: [{ model: Categories, as: 'categories', through: { attributes: [] } }],
   });
   return updatedPost;
 };

const deletePost = async (id, user) => {
  const returnOfResult = await checkPostOwner(id, user.id);
  if (returnOfResult) { 
    return returnOfResult;
  }
  await BlogPosts.destroy({ where: { id } });
  return { isError: false };
};

const searchPosts = async (searchTerm) => {
  const posts = await BlogPosts.findAll({
  include: 
    [{ model: Categories, as: 'categories', through: { attributes: [] } },
     { model: Users, as: 'user' }] });
  const filteredPosts = posts.filter((post) =>
   post.dataValues.title.includes(searchTerm) || post.dataValues.content.includes(searchTerm));
  console.log(filteredPosts);
  return filteredPosts;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePost,
  searchPosts,
};