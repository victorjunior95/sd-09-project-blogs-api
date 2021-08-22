const Router = require('express').Router();
const { tokenVerification } = require('../controllers/auth.controller');
const { createCategory } = require('../controllers/categories.controller');

Router.route('/')
  .post(tokenVerification, createCategory);

module.exports = Router;
