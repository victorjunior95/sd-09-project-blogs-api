const userService = require('../services/Users');

const CREATED_STATUS = 201;

const registerUser = (req, res) => userService.register(req.body)
  .then((newUser) => res.status(CREATED_STATUS).json(newUser));

module.exports = {
  registerUser,
};
