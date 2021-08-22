const userService = require('../services/Users');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const NO_CONTENT_STATUS = 204;

const registerUser = (req, res) => userService.register(req.body)
  .then((newUser) => res.status(CREATED_STATUS).json(newUser));

const loginUser = (req, res) => userService.login(req.body)
  .then((token) => res.status(OK_STATUS).json(token));

const getAllUsers = (req, res) => userService.getAll()
  .then((data) => res.status(OK_STATUS).json(data));

const getUser = (req, res) => userService.getUser(req.params)
  .then((data) => res.status(OK_STATUS).json(data));

const eraseUser = (req, res) => userService.erase(req.user)
  .then(() => res.status(NO_CONTENT_STATUS).json());

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
  eraseUser,
};
