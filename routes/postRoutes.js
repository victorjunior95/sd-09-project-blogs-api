const { Router } = require('express');
const postController = require('../controllers/postController');
const { tokenValidation } = require('../middlewares/tokenValidation');

const postRoute = Router();

postRoute
    .get('/search?:searchTerm', postController.searchPosts);
postRoute
    .post('/', tokenValidation, postController.createPost)
    .get('/', tokenValidation, postController.getAllPosts);
postRoute
    .get('/:id', tokenValidation, postController.getPostById)
    .delete('/:id', tokenValidation, postController.deletePost)
    .put('/:id', tokenValidation, postController.updatePostById);
  
module.exports = postRoute;