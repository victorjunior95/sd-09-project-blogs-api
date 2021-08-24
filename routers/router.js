const express = require('express');
const UsersRouter = require('../controllers/UserController');
const LoginRouter = require('../controllers/LoginController');
const CategoriesRouter = require('../controllers/CategoriesController');
const PostRouter = require('../controllers/PostController');

const router = express.Router();

router.use('/user', UsersRouter);
router.use('/login', LoginRouter);
router.use('/categories', CategoriesRouter);
router.use('/post', PostRouter);

module.exports = router;
