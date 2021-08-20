const express = require('express');
const rescue = require('express-rescue');

const validateToken = require('../auth/validateUser');

const userController = require('../controllers/Users');

const router = express.Router();

router.post('/', rescue(validateToken, userController.registerUser));

module.exports = router;
