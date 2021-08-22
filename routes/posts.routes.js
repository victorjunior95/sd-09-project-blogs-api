const Router = require('express').Router();
const { tokenVerification } = require('../controllers/auth.controller');
const { createPost, listPosts, getPostById } = require('../controllers/posts.controller');

Router.route('/')
  .post(tokenVerification, createPost)
  .get(tokenVerification, listPosts);

Router.route('/:id')
  .get(tokenVerification, getPostById);

module.exports = Router;
