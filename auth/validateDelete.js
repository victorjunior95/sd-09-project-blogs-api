const { getPost } = require('../services/Post');

const UNAUTHORIZED_STATUS = {
  status: 401,
  message: 'Unauthorized user',
};
const NOT_FOUND_STATUS = {
  status: 404,
  message: 'Post does not exist',
};

const verifyAuthorPost = async (postId, userId) => {
  const user = postId.userId;
  if (user === userId) return true;
};

const validateDelete = async (req, res, next) => {
  const userId = req.user.id;

  const postId = await getPost(req.params);
  if (!postId) throw NOT_FOUND_STATUS;

  const authorized = await verifyAuthorPost(postId, userId);
  if (!authorized) throw UNAUTHORIZED_STATUS;

  return next();
};

module.exports = validateDelete;
