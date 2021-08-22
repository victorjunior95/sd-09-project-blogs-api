const postService = require('../services/Post');

const OK_STATUS = 200;
const CREATED_STATUS = 201;

const registerPost = (req, res) => postService.register(req.body, req.user.id)
  .then((newPost) => res.status(CREATED_STATUS).json(newPost));

const getAllPost = (req, res) => postService.getAll()
  .then((data) => res.status(OK_STATUS).json(data));

const getPost = (req, res) => postService.getPost(req.params)
  .then((post) => res.status(OK_STATUS).json(post));

const updatePost = (req, res) => postService.update(req.params, req.body)
  .then((updatedPost) => res.status(OK_STATUS).json(updatedPost));

module.exports = {
  registerPost,
  getAllPost,
  getPost,
  updatePost,
};
