const express = require('express');
const ValidateToken = require('../middlewares/ValidateToken');
const { newCategoryService } = require('../services/CategoriesService');
const { allCategoriesService } = require('../services/CategoriesService');

const CategoriesRouter = express.Router();

CategoriesRouter.post('/', ValidateToken, async (req, res) => {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: '"name" is required' });

    const newCategory = await newCategoryService(name);

    res.status(201).json(newCategory);
});

CategoriesRouter.get('/', ValidateToken, async (req, res) => {
    const allCategories = await allCategoriesService();
    res.status(200).json(allCategories);
});

module.exports = CategoriesRouter;