const UserServices = require('../services/usersServices');

const OKAY = 200;
const NO_CONTENT = 204;
const CREATE = 201;

const add = async (req, res) => {
  const { body } = req;
  const token = await UserServices.add(body);
  return res.status(CREATE).json({ token });
};

const getAll = async (req, res) => {
  const response = await UserServices.getAll();
  res.status(OKAY).json(response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await UserServices.getById(id);
  res.status(OKAY).json(response);
};

const deleteSelf = async (req, res) => {
  const { user } = req;
  await UserServices.deleteSelf(user.id);
  res.status(NO_CONTENT).json();
};

module.exports = {
  add,
  getAll,
  getById,
  deleteSelf,
};