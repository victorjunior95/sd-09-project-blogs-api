const Router = require('express').Router();
const { tokenVerification } = require('../controllers/auth.controller');
const { createCategory, listCategories } = require('../controllers/categories.controller');

Router.route('/')
  .post(tokenVerification, createCategory)
  .get(tokenVerification, listCategories);

module.exports = Router;
