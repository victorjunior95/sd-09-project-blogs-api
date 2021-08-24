const express = require('express');
const controllerUser = require('../controller/userController');
const controllerCategory = require('../controller/controllerCategory');
const controllerPost = require('../controller/blogPostController');
const middleware = require('../middlewares');

const router = express.Router();

router.put('/post/:id',
middleware.auth,
middleware.autenticUser,
middleware.validUpdate,
controllerPost.putPostsById);

router.delete('/post/:id',
middleware.auth,
middleware.autenticUser,
controllerPost.delPostsById);
// router.delete('/user/me');

router.get('/user/:id', controllerUser.getUser);
router.get('/post/:id', middleware.auth, controllerPost.getPostsById);
router.get('/user', controllerUser.getAllUsers);
router.get('/categories', controllerCategory.getAllCategories);
router.get('/post', middleware.auth, controllerPost.getAllPost);

router.post('/user', middleware.validUser, controllerUser.createUsers);
router.post('/login', middleware.createToken, controllerUser.login);
router.post('/categories', middleware.nameCategory, controllerCategory.createCategory);
router.post('/post', middleware.auth, middleware.validPost, controllerPost.createPost);

module.exports = router;
