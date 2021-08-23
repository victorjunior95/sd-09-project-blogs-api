const { Router } = require('express');
const postController = require('../controllers/postController');
// const { tokenValidation } = require('../middlewares/tokenValidation');

const postRoute = Router();

postRoute
    .get('/search?:searchTerm', postController.searchPosts);
postRoute
    .post('/', postController.createPost)
    .get('/', postController.getAllPosts);
postRoute
    .get('/:id', postController.getPostById)
    .delete('/:id', postController.deletePost)
    .put('/:id', postController.updatePostById);
  
module.exports = postRoute;