const jwt = require('jsonwebtoken');
const userServices = require('../services/userServices');

const secret = process.env.JWT_SECRET;

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const { id } = await userServices.create({ displayName, email, password, image });
  const token = jwt.sign({ data: { id, email } }, secret, jwtConfig);
  return res
    .status(201)
    .json({ token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const { _id } = await userServices.login({ email, password });
  const token = jwt.sign({ data: { id: _id, email } }, secret, jwtConfig);
  return res
    .status(200)
    .json({ token });
};

const getAll = async (_req, res) => {
  const response = await userServices.getAll();
  return res
    .status(200)
    .json(response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await userServices.getById(id);
  return res
    .status(200)
    .json(response);
};

module.exports = {
  create,
  login,
  getAll,
  getById,
};