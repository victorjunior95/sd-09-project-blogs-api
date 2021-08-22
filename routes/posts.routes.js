const Router = require('express').Router();
const { tokenVerification } = require('../controllers/auth.controller');
const { createPost } = require('../controllers/posts.controller');

Router.route('/')
  .post(tokenVerification, createPost);

module.exports = Router;
