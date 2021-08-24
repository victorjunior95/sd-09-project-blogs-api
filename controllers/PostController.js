const express = require('express');
const BlogPostValidate = require('../middlewares/BlogPostValidate');
const DoesPostExists = require('../middlewares/DoesPostExists');
const ValidateToken = require('../middlewares/ValidateToken');
const { doesCategoriesExists } = require('../services/CategoriesService');
const { 
    createPost, 
    createPostCategory, 
    getAllPosts, 
    getPostById,
} = require('../services/PostService');

const PostRouter = express.Router();

PostRouter.post('/', ValidateToken, BlogPostValidate, async (req, res) => {
    const { title, categoryIds, content } = req.body;
    const { id } = req.user;

    const isCategoriesIdValid = await doesCategoriesExists(categoryIds);
    if (!isCategoriesIdValid) return res.status(400).json({ message: '"categoryIds" not found' });

    const newPostResponse = await createPost(title, content, id);
    await createPostCategory(categoryIds, newPostResponse.id);
    return res.status(201).json(newPostResponse);
});

PostRouter.get('/', ValidateToken, async (req, res, next) => {
    try {
        const allPosts = await getAllPosts();
        return res.status(200).json(allPosts);
    } catch (err) {
        return next(err);
    }
});

PostRouter.get('/:id', ValidateToken, DoesPostExists, async (req, res, next) => {
    const { id } = req.params;
    try {
        const postFoundByID = await getPostById(id);
        return res.status(200).json(postFoundByID);
    } catch (err) {
        return next(err);
    }
});

module.exports = PostRouter;