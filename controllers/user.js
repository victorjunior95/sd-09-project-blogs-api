const userServices = require('../services/userServices');

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const response = await userServices.create(displayName, email, password, image);

  return res.status(response.code).json(response.message);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const response = await userServices.login(email, password);

  return res.status(response.code).json(response.message);
};

const getAll = async (_req, res) => {
  const response = await userServices.getAll();

  return res.status(response.code).json(response.message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await userServices.getById(id);

  return res.status(response.code).json(response.message);
};

module.exports = {
  create,
  login,
  getAll,
  getById,
};