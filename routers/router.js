const express = require('express');
const UsersRouter = require('../controllers/UserController');
const LoginRouter = require('../controllers/LoginController');

const router = express.Router();

router.use('/user', UsersRouter);
router.use('/login', LoginRouter);

module.exports = router;
