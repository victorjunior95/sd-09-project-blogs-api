const { StatusCodes } = require('http-status-codes');
const category = require('../services/categorieService');

const createCategory = async (req, res) => {
  console.log('[CATEGORY CONTROLLER] : CHAMOU O MÉTODO CRIAR CATEGORY');
  try {
    const result = await category.createCategory(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.log(`[CATEGORY CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const getAllCategories = async (_req, res) => {
  console.log('[CATEGORY CONTROLLER] : CHAMOU O MÉTODO BUSCAR TODAS CATEGORIES');
  try {
    const result = await category.getAllCategories();
    res.status(200).json(result);
  } catch (error) {
    console.log(`[CATEGORY CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
module.exports = {
  createCategory,
  getAllCategories,
};
