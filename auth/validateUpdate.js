const Joi = require('joi');

const { getPost } = require('../services/Post');

const BAD_REQUEST = 400;
const UNAUTHORIZED_STATUS = {
  status: 401,
  message: 'Unauthorized user',
};
const NOT_FOUND_STATUS = {
  status: 404,
  message: 'Post does not exist',
};

const updateSchema = Joi.object().keys({
  title: Joi.string().not().empty().required(),
  content: Joi.string().not().empty().required(),
});

const verifyAuthorPost = async (postId, userId) => {
  const user = postId.userId;
  if (user === userId) return true;
};

const validateUpdate = async (req, res, next) => {
  const updateInfo = req.body;
  const userId = req.user.id;

  if (updateInfo.categoryIds !== undefined) {
    return res.status(BAD_REQUEST).json({
      message: 'Categories cannot be edited',
    });
  }

  const { error } = updateSchema.validate(updateInfo);
  if (error) next(error);

  const postId = await getPost(req.params);
  if (!postId) throw NOT_FOUND_STATUS;

  const authorized = await verifyAuthorPost(postId, userId);
  if (!authorized) throw UNAUTHORIZED_STATUS;

  return next();
};

module.exports = validateUpdate;
