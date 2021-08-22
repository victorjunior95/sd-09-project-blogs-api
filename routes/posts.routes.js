const Router = require('express').Router();
const { tokenVerification } = require('../controllers/auth.controller');
const {
  createPost,
  listPosts,
  getPostById,
  updatePost,
  deletePostById,
} = require('../controllers/posts.controller');

Router.route('/')
  .post(tokenVerification, createPost)
  .get(tokenVerification, listPosts);

Router.route('/search')
  .get(tokenVerification, listPosts);

Router.route('/:id')
  .get(tokenVerification, getPostById)
  .put(tokenVerification, updatePost)
  .delete(tokenVerification, deletePostById);

module.exports = Router;
