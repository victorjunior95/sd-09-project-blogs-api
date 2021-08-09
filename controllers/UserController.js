const express = require('express');
const { TokenCreate } = require('../services/TokenCreate');
const NewUserDataValidate = require('../middlewares/NewUserDataValidade');
const DoesEmailExists = require('../middlewares/DoesEmailExists');
const { User } = require('../models');


const UsersRouter = express.Router();

UsersRouter.post('/', DoesEmailExists, NewUserDataValidate, async (req, res) => {
    const { displayName, email, image, id } = req.body;

    await User.create({ displayName, email, image, id });
    
    const token = await TokenCreate({ displayName, email, image, id });

      return res.status(201).json({ token });
});

module.exports = UsersRouter;
