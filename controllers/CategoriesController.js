const express = require('express');
const ValidateToken = require('../middlewares/ValidateToken');
const { Category } = require('../models')

const CategoriesRouter = express.Router();

CategoriesRouter.post('/', ValidateToken, async (req, res) => {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: '"name" is required' });
    const newCategory = await Category.create({ name });

    res.status(201).json(newCategory)
});

module.exports = CategoriesRouter;