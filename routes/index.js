const router = require('express').Router();
const { UserController, CategoryController, PostController } = require('../controllers');
const middlewares = require('../middlewares');
const validators = require('../validators');

router.post('/user', validators.createUser, UserController.createUser);
router.post('/login', validators.login, UserController.login);
router.get('/user', middlewares.jwt, UserController.getAll);
router.get('/user/:id', middlewares.jwt, UserController.getUser);

router.post('/categories', middlewares.jwt, CategoryController.create);
router.get('/categories', middlewares.jwt, CategoryController.getAll);
router.post('/post', middlewares.jwt, validators.createPost, PostController.create);
router.get('/post', middlewares.jwt, PostController.getAll);
router.get('/post/:id', middlewares.jwt, PostController.getPost);

module.exports = router;