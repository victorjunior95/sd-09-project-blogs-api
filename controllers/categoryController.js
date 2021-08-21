const models = require('../models');

/**
 * @type { { Categoria: import('sequelize/types').ModelType } }
 */
const { Categoria } = models;

module.exports = {
    async create(req, res) {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: '"name" is required' });
        }
        const categoria = await Categoria.create({ name });
        res.status(201).json(categoria);
    },
    async getAll(req, res) {
        const categorias = await Categoria.findAll();
        res.status(200).json(categorias);
    },
};