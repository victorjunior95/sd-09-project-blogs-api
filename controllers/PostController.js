const express = require('express');
const BlogPostValidate = require('../middlewares/BlogPostValidate');
const ValidateToken = require('../middlewares/ValidateToken');
const { doesCategoriesExists } = require('../services/CategoriesService');
const { createPost, createPostCategory, getAllPosts } = require('../services/PostService');

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
    console.log('ENTROU AQUI');
    try {
        const allPosts = await getAllPosts();
        console.log(allPosts);
        return res.status(200).json(allPosts);
    } catch (err) {
        return next(err);
    }
});

module.exports = PostRouter;