const models = require('../models');
/**
 * @type { { 
 * BlogPost: import('sequelize/types').ModelType,
 * Categoria: import('sequelize/types').ModelType,
 * PostsCategories: import('sequelize/types').ModelType,
 * User: import('sequelize/types').ModelType,
 * } }
 */
const { BlogPost, Categoria, PostsCategories, User } = models;

module.exports = {
    async create(req, res) {
        const { title, content, categoryIds } = req.body;
        const totalCategoriesFounded = await Categoria.count({ where: { id: categoryIds } });
        if (totalCategoriesFounded !== categoryIds.length) {
            return res.status(400).json({ message: '"categoryIds" not found' });
        }
        const { dataValues: post } = await BlogPost.create({ title, content, userId: req.user.id });
        await PostsCategories.bulkCreate(categoryIds.map((id) => ({
            postId: post.id,
            categoryId: id,
        })));
        res.status(201).json({
            content: post.content,
            title: post.title,
            id: post.id,
            userId: post.userId,
        });
    },
    async getAll(req, res) {
        const posts = await BlogPost.findAll({ include: [
            { model: Categoria, as: 'categories' },
            { model: User, as: 'user' },
        ] });
        res.status(200).json(posts);
    },
    async getPost(req, res) {
        const { id } = req.params;
        const post = await BlogPost.findOne({ where: { id },
            include: [
            { model: Categoria, as: 'categories' },
            { model: User, as: 'user' },
        ] });
        if (!post) {
            return res.status(404).json({ message: 'Post does not exist' });
        }
        res.status(200).json(post);
    },
    async update(req, res) {
        const { title, content } = req.body;
        const { id } = req.params;
        await BlogPost.update({ title, content }, { where: { id } });
        const updatedPost = await BlogPost.findOne({ where: { id },
            include: [{ model: Categoria, as: 'categories' }] });
        res.status(200).json(updatedPost);
    },
};