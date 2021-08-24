const { StatusCodes } = require('http-status-codes');
const posts = require('../services/postService');

const createPost = async (req, res) => {
 console.log('[POST CONTROLLER] : CHAMOU O MÉTODO CRIAR UM POST');
  try {
    const bodyValue = req.body;
    const userValue = req.user;
    const result = await posts.createPost(bodyValue, userValue);
    if (result.isError) return res.status(result.status).json(result.err);
      return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    console.log(`[POST CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  console.log('[POST CONTROLLER] : CHAMOU O MÉTODO BUSCAR TODOS POSTS');
  try {
    const result = await posts.getAllPosts();
    if (result.isError) return res.status(result.status).json(result.err);
   return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(`[POST CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const getPostById = async (req, res) => {
  console.log('[POST CONTROLLER] : CHAMOU O MÉTODO BUSCAR UM POST');
  try {
    const result = await posts.getPostById(req.params.id);
    if (result.isError) return res.status(result.status).json(result.err);
   return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(`[POST CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const updatePostById = async (req, res) => {
  console.log('[POST CONTROLLER] : CHAMOU O MÉTODO ATUALIZAR UM POST');
  try {
    const result = await posts.updatePostById(req.params.id, req.body, req.user);
    if (result.isError) return res.status(result.status).json(result.err);
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    let code = 400;
    if (error === 'Unauthorized user') code = 401;
    console.log(`[POST CONTROLLER] : buscar => ${error}`);
    res.status(code).json({ message: error });
  }
};

const deletePost = async (req, res) => {
  console.log('[POST CONTROLLER] : CHAMOU O MÉTODO DELETAR UM POST');
  try {
   const result = await posts.deletePost(req.params.id, req.user);
   if (result.isError) return res.status(result.status).json(result.err);
   return res.status(204).end();
  } catch (error) {
      console.log(`[POST CONTROLLER] : buscar => ${error}`);
   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
  }
};

const searchPosts = async (req, res) => {
  console.log('[POST CONTROLLER] : CHAMOU O MÉTODO PROCURAR UM POST');
  try {
    const result = await posts.searchPosts(req.query.q);
      res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(`[POST CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePost,
  searchPosts,
};