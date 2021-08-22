const rescue = require('express-rescue');
const User = require('../services/User');

const CREATED = 201;
const OK = 200;

const create = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const token = await User.create(displayName, email, password, image);
  return res.status(CREATED).json({ token });
});

const login = rescue(async (req, res) => {
  const { email, password } = req.body;
  const token = await User.login(email, password);
  return res.status(OK).json({ token });
});

const getAll = rescue(async (_req, res) => {
  const users = await User.getAll();
  res.status(OK).json(users);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const user = await User.getById(id);
  res.status(OK).json(user);
});

module.exports = { create, login, getAll, getById };