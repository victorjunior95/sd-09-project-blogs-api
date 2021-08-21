const models = require('../models');
/**
 * @type { { 
 * BlogPost: import('sequelize/types').ModelType,
 * Categoria: import('sequelize/types').ModelType,
 * PostsCategories: import('sequelize/types').ModelType,
 * } }
 */
const { BlogPost, Categoria, PostsCategories } = models;

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
};