require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../services/user');

const { JWT_SECRET } = process.env;

const create = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const newUser = await User.create({ displayName, email, password, image });

  if (newUser.error) return next(newUser);

  res.status(201).json(newUser);
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const result = await User.login({ email, password });

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  if (await result.error) return next(result);

  const token = jwt.sign({ data: result.user }, JWT_SECRET, jwtConfig);

  res.status(200).json({ token });
};

const getAllUsers = async (req, res, _next) => {
  const allUsers = await User.getAllUsers();

  res.status(200).send(allUsers);
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.getUserById(id);

  if (user.error) return next(user);

  res.status(200).json(user);
};
module.exports = {
  create,
  login,
  getAllUsers,
  getUserById,
};