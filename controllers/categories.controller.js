const { create, list } = require('../services/categories.service');

const createCategory = async (req, res) => {
  try {
    const { status, data } = await create(req.body);

    return res.status(status).json(data);
  } catch (err) { return res.status(400).json(err); }
};

const listCategories = async (_req, res) => {
  try {
    const { status, data } = await list();

    return res.status(status).json(data);
  } catch (err) { return res.status(400).json(err); }
};

module.exports = {
  createCategory,
  listCategories,
};
