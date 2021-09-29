const express = require('express');
const rescue = require('express-rescue');

const validateUser = require('../auth/validateUser');
const validateToken = require('../auth/validateToken');

const userController = require('../controllers/Users');

const router = express.Router();

router.post('/', rescue(validateUser), rescue(userController.registerUser));
router.get('/', validateToken, rescue(userController.getAllUsers));
router.get('/:id', validateToken, rescue(userController.getUser));
router.delete('/me', validateToken, userController.eraseUser);

module.exports = router;
