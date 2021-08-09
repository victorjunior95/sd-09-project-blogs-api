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
  res.status(200).json(allUsers);
});

module.exports = UsersRouter;
