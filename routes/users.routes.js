const Router = require('express').Router();
const { createUser, newUserValidator } = require('../controllers/users.controller');

Router.route('/')
  .post(newUserValidator, createUser);

module.exports = Router;