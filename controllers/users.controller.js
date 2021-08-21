const { create, validateNewUser, login, list } = require('../services/users.service');

const newUserValidator = async (req, res, next) => {
  try {
    const error = await validateNewUser(req.body);
  
    if (error) return res.status(error.status).json({ message: error.message });
  
    return next();
  } catch (err) { return res.status(400).json(err); }
};

const createUser = async (req, res) => {
  try {
    const { status, data } = await create(req.body);

    return res.status(status).json(data);
  } catch (err) { return res.status(400).json(err); }
};

const userLogin = async (req, res) => {
  try {
    const { status, data } = await login(req.body);

    return res.status(status).json(data);
  } catch (err) { return res.status(400).json(err); }
};

const listAll = async (req, res) => {
  try {
    const { status, data } = await list();

    return res.status(status).json(data);
  } catch (err) { return res.status(400).json(err); }
};

module.exports = {
  newUserValidator,
  createUser,
  userLogin,
  listAll,
};
