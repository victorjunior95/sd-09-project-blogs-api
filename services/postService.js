const Joi = require('joi');
const { BlogPosts, Categories, Users } = require('../models');

  const schemaPost = Joi.object({
    title: Joi.required(),
    content: Joi.required(),
    categoryIds: Joi.required(),
  });

// const validateEditPostInputs = (data) => {
//   const error = 'Categories cannot be edited';
//   if (data.categoryIds) return { isError: true, err: { message: error }, status: 400 };

//   const validation = Joi.object({
//     title: Joi.required(),
//     content: Joi.required(),
//   }).validate(data);

//   if (validation.error) {
//  return {
//      isError: true,
//      err: { message: validation.error.details[0].message },
//      status: 400,     
//   }; 
// }
// };

// const checkPostOwner = async (postId, userId) => {
//   const unauthorized = 'Unauthorized user';
//   const inexistent = 'Post does not exist';
//   const post = await BlogPosts.findByPk(postId);
//   if (post === null) {
//   return {
//     isError: true,
//     err: { message: inexistent },
//     status: 400,
//   };
// }
//   if (post.dataValues.userId !== userId) {
//    return { isError: true, err: { message: unauthorized }, status: 400 };
//   }
// };
// const validateCategories = async (categories) => {
//   const error = 'categoryIds" not found';
//   const validCategories = await Categories.findAll();
 
//   if (categories === undefined) { return { isError: true, err: { message: 'aeeaea' }, code: 400 }; }
//   const categoriesId = validCategories.map((item) => item.id);
//   const validCategory = categories.every((id) => categoriesId.includes(id));
//   if (!validCategory) {
//      return {
//     isError: true,
//     error: { message: error },
//     code: 400,
//   };
// }
// };

// const validateCategories = async (categoryIds) => {
//   const categories = await Categories.findAll({ raw: true });
//   const CategoryId = categories.map(({ id }) => id);
//   return categoryIds.every((category) => CategoryId.includes(category));
// };

// const createPostCategories = async (categoryId, postId) => {
//   await categoryId.map((id) => PostsCategories.create({ categoryId: id, postId }));
// };

const createPost = async (title, content, categoryIds, userId) => {
  // validateNewPostInputs(data);
  // const { id } = user;
  // console.log(data, 'sou o data meo');
  // const { title, content, categoryIds } = data;
  // await validateCategories(categoryIds);
  // const result = await BlogPosts.create({
  //   title,
  //   content,
  //   userId: id,
  //   published: Date(),
  // });
  //  await createPostCategories(categoryIds, result.id);
  // return result;
  
   const { error } = schemaPost.validate({ title, content, categoryIds });

   if (error) {
     return { isError: true, err: { message: error.details[0].message }, status: 400 };
   }

  // const existing = await validateCategories(categoryIds);

  // if (!existing) {
  //   return { isError: true, err: { message: 'categoryIds" not found' }, status: 400 };
  // }

   const result = await BlogPosts.create({ title, content, userId });

   const { updated: _, published: __, ...UserWithoutTime } = result.dataValues;
   // await createPostCategories(categoryIds, result.id);

   return UserWithoutTime; 
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
  if (post === null) { return { isError: true, message: 'Post does not exist', status: 404 }; }
  return post;
};

// const updatePostById = async (id, data, user) => {
//   validateEditPostInputs(data);
//   await checkPostOwner(id, user.dataValues.id);
//   const { title, content } = data;
//   await BlogPosts.update({ title, content, updated: Date() }, { where: { id } });
//   const updatedPost = await BlogPosts.findByPk(id, {
//     include: [{ model: Categories, as: 'categories', through: { attributes: [] } }],
//   });
//   return updatedPost;
// };

const deletePost = async (id, _user) => {
  const error = 'Not deleted';
 // await checkPostOwner(id, user.dataValues.id);
  const result = await BlogPosts.destroy({ where: { id } });
  if (result !== 1) { return { isError: true, message: error, status: 400 }; }
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
 // updatePostById,
  deletePost,
  searchPosts,
};