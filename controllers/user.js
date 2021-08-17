const userServices = require('../services/userServices');

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const response = await userServices.create(displayName, email, password, image);

  return res.status(response.code).json(response.message);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const response = await userServices.loginService(email, password);

  return res.status(response.code).json(response.message);
};

const getAll = async (req, res) => {
  const { authorization } = req.headers;
  const response = await userServices.getAllService(authorization);
  return res.status(response.code).json(response.message);
};

module.exports = {
  create,
  login,
  getAll,
};