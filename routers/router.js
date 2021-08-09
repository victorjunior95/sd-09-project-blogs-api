const express = require('express');
const UsersRouter = require('../controllers/UserController');


const router = express.Router();

router.use('/user', UsersRouter);

module.exports = router;
