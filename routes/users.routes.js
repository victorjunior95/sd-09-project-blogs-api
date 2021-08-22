const Router = require('express').Router();
const { tokenVerification } = require('../controllers/auth.controller');
const {
  createUser,
  newUserValidator,
  listAll,
  getUserById,
  deleteMe,
} = require('../controllers/users.controller');

Router.route('/')
  .post(newUserValidator, createUser)
  .get(tokenVerification, listAll);

Router.route('/me')
  .delete(tokenVerification, deleteMe);

Router.route('/:id')
  .get(tokenVerification, getUserById);

module.exports = Router;
