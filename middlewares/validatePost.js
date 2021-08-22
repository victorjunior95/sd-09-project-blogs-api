const Joi = require('@hapi/joi');

const validObjectCreatePost = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const validObjectUpdatePost = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const validPost = (title, content, categoryIds) => {
  const { error } = validObjectCreatePost.validate({
    title,
    content,
    categoryIds,
  });

  if (error) {
    return {
          status: 400,
          error: {
            message: error.message,
          },
        };
  } 
};

const validUpdate = (title, content) => {
  const { error } = validObjectUpdatePost.validate({
    title,
    content,
  });

  if (error) {
    return {
          status: 400,
          error: {
            message: error.message,
          },
        };
  } 
};

const VerifyIfNoIsCategoriesOnEdition = (categoryIds) => {
  if (categoryIds) {
    return {
      status: 400, error: { message: 'Categories cannot be edited' },
    };
  }
};

module.exports = {
  validPost,
  validUpdate,
  VerifyIfNoIsCategoriesOnEdition,
};