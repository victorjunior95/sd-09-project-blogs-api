const Router = require('express').Router();
const { tokenVerification } = require('../controllers/auth.controller');
const { createPost, listPosts } = require('../controllers/posts.controller');

Router.route('/')
  .post(tokenVerification, createPost)
  .get(tokenVerification, listPosts);

module.exports = Router;
