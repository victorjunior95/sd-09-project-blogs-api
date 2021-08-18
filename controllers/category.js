const categoryServices = require('../services/categoryServices');

const create = async (req, res) => {
  const { name } = req.body;
  const response = await categoryServices.create(name);

  return res.status(response.code).json(response.message);
};

module.exports = {
  create,
};