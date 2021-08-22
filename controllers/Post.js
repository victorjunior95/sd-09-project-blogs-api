const postService = require('../services/Post');

const CREATED_STATUS = 201;

const registerPost = (req, res) => postService.register(req.body, req.user.id)
  .then((newPost) => res.status(CREATED_STATUS).json(newPost));

module.exports = {
  registerPost,
};
