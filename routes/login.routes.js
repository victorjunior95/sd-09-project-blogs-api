const Router = require('express').Router();
const { userLogin } = require('../controllers/users.controller');

Router.route('/')
  .post(userLogin);

module.exports = Router;
