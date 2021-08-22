const express = require('express');
const rescue = require('express-rescue');

const validateToken = require('../auth/validateToken');
const validatePost = require('../auth/validatePost');
const validateUpdate = require('../auth/validateUpdate');
const validateDelete = require('../auth/validateDelete');

const postController = require('../controllers/Post');

const router = express.Router();

router.post('/', validateToken, rescue(validatePost), rescue(postController.registerPost));
router.get('/', validateToken, rescue(postController.getAllPost));
router.get('/:id', validateToken, rescue(postController.getPost));
router.put('/:id', validateToken, rescue(validateUpdate), rescue(postController.updatePost));
router.delete('/:id', validateToken, rescue(validateDelete), rescue(postController.erasePost));

module.exports = router;
