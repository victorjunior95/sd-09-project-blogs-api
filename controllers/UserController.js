const express = require('express');
const { TokenCreate } = require('../services/TokenCreate');
const NewUserDataValidate = require('../middlewares/NewUserDataValidade');
const DoesEmailExists = require('../middlewares/DoesEmailExists');
const ValidateToken = require('../middlewares/ValidateToken');
const { User } = require('../models');

const UsersRouter = express.Router();

UsersRouter.post('/', DoesEmailExists, NewUserDataValidate, async (req, res) => {
  const { displayName, email, image, id } = req.body;

  await User.create({ displayName, email, image, id });

  const token = await TokenCreate({ displayName, email, image, id });

  return res.status(201).json({ token });
});

UsersRouter.get('/', ValidateToken, async (req, res) => {
  const allUsers = await User.findAll();
  const { password, ...userWithoutPassword } = allUsers;
  res.status(200).json(userWithoutPassword);
});

UsersRouter.get('/:id', ValidateToken, async (req, res) => {
  const userFoundById = await User.findOne({ where: { id: req.params.id } });
  if (!userFoundById) return res.status(404).json({ message: 'User does not exist' });
  const { password, ...userWithoutPassword } = userFoundById.dataValues;
  res.status(200).json(userWithoutPassword);
});

module.exports = UsersRouter;
