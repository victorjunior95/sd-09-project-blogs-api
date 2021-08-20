const express = require('express');
const rescue = require('express-rescue');

const validateUser = require('../auth/validateUser');

const userController = require('../controllers/Users');

const router = express.Router();

router.post('/', rescue(validateUser), rescue(userController.registerUser));

module.exports = router;
