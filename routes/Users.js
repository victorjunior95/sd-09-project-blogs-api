const express = require('express');
const rescue = require('express-rescue');

const validateUser = require('../auth/validateUser');

const userController = require('../controllers/Users');

const router = express.Router();

router.post('/', validateUser, rescue(userController.registerUser));
// router.post('/', validateUser, userController.registerUser);

module.exports = router;
