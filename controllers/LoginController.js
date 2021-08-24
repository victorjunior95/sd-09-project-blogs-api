const express = require('express');
const LoginValidate = require('../middlewares/LoginValidate');
const { makeLoginService } = require('../services/LoginService');

const LoginRouter = express.Router();

LoginRouter.post('/', LoginValidate, async (req, res) => {
    const { displayName, email, image, id } = req.body;

    const token = await makeLoginService(displayName, email, image, id);

    return res.status(200).json({ token });
});

module.exports = LoginRouter;
