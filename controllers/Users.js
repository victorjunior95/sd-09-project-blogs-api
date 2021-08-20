const userService = require('../services/Users');

const OK_STATUS = 200;
const CREATED_STATUS = 201;

const registerUser = (req, res) => userService.register(req.body)
  .then((newUser) => res.status(CREATED_STATUS).json(newUser));

const loginUser = (req, res) => userService.login(req.body)
  .then((token) => res.status(OK_STATUS).json(token));

const getAllUsers = (_req, res) => userService.getAll()
.then((data) => res.status(OK_STATUS).json(data));

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
};
