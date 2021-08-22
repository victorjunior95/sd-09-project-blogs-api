const router = require('express').Router();
const User = require('./controllers/user');
const Categorie = require('./controllers/categorie');
const BlogPost = require('./controllers/blogPost');
const { validateToken } = require('./middlewares/validateToken');

router.post('/user', User.create);
router.post('/login', User.login);
router.get('/user', validateToken, User.getAllUsers);
router.get('/user/:id', validateToken, User.getUserById);

router.post('/categories', validateToken, Categorie.create);
router.get('/categories', validateToken, Categorie.getAllCategories);

router.post('/post', validateToken, BlogPost.create);
router.get('/post', validateToken, BlogPost.getAllPosts);
router.get('/post/:id', validateToken, BlogPost.getPostById);
router.put('/post/:id', validateToken, BlogPost.update);

router.delete('/post/:id', validateToken, BlogPost.deletePost);

module.exports = router;