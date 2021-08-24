const { Op } = require('sequelize');
const { Category } = require('../models');

const newCategoryService = async (name) => {
    const newCategory = await Category.create({ name });
    return newCategory;
};

const allCategoriesService = async () => {
    const allCategories = await Category.findAll({});
    return allCategories;
};

const doesCategoriesExists = async (categoriesIds) => {
    const categories = await Category.findAll({ where: { id: { [Op.in]: categoriesIds } } });
    return categories.length === categoriesIds.length;
  };

module.exports = {
    newCategoryService,
    allCategoriesService,
    doesCategoriesExists,
};