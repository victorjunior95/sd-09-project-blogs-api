const express = require('express');
const rescue = require('express-rescue');

const validateLogin = require('../auth/validateLogin');

const userController = require('../controllers/Users');

const router = express.Router();

router.post('/', rescue(validateLogin), rescue(userController.loginUser));

module.exports = router;
