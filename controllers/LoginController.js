const express = require('express');
const { TokenCreate } = require('../services/TokenCreate');
const LoginValidate = require('../middlewares/LoginValidate');

const LoginRouter = express.Router();

LoginRouter.post('/', LoginValidate, async (req, res) => {
    const { displayName, email, image, id, password } = req.body;

    const token = await TokenCreate({ displayName, email, image, id, password });

    return res.status(200).json({ token });
});

module.exports = LoginRouter;
