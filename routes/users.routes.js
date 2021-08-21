const Router = require('express').Router();
const { tokenVerification } = require('../controllers/auth.controller');
const { createUser, newUserValidator, listAll } = require('../controllers/users.controller');

Router.route('/')
  .post(newUserValidator, createUser)
  .get(tokenVerification, listAll);

module.exports = Router;