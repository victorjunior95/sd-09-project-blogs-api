const Router = require('express').Router();
const { tokenVerification } = require('../controllers/auth.controller');
const {
  createUser,
  newUserValidator,
  listAll,
  getUserById,
} = require('../controllers/users.controller');

Router.route('/')
  .post(newUserValidator, createUser)
  .get(tokenVerification, listAll);

Router.route('/:id')
  .get(tokenVerification, getUserById);

module.exports = Router;
