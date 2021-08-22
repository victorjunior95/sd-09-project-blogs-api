const rescue = require('express-rescue');
const User = require('../services/User');

const CREATED = 201;

const create = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const token = await User.create(displayName, email, password, image);
  return res.status(CREATED).json({ token });
});

module.exports = { create };