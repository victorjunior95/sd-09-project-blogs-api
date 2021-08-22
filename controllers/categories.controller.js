const { create } = require('../services/categories.service');

const createCategory = async (req, res) => {
  try {
    const { status, data } = await create(req.body);

    return res.status(status).json(data);
  } catch (err) { console.log(err); return res.status(400).json(err); }
};

module.exports = {
  createCategory,
};
