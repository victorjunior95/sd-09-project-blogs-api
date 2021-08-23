const { StatusCodes } = require('http-status-codes');
const UserService = require('../services/userService');

const createUser = async (req, res) => {
 console.log('[USER CONTROLLER] : CHAMOU O MÉTODO CRIAR UM USER');
   try {
      const { displayName, email, password, image } = req.body;
      const result = await UserService.createUser(displayName, email, password, image);
      if (result.isError) return res.status(result.status).json(result.err);
      return res.status(StatusCodes.CREATED).json({ result });
   } catch (error) {
    console.log(`[USER CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
  
  const userLogin = async (req, res) => {
    console.log('[USERLOGIN CONTROLLER] : CHAMOU O MÉTODO FAZER UM LOGIN');
    try {
      const { email, password } = req.body;
      const result = await UserService.userLogin(email, password);
      console.log(result);
      if (result.isError) return res.status(result.status).json(result.err);
      return res.status(StatusCodes.OK).json({ token: result });
    } catch (error) {
      console.log(`[USER CONTROLLER] : buscar => ${error}`);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  };
  
  const getAllUser = async (_req, res) => {
    console.log('[USER CONTROLLER] : CHAMOU O MÉTODO GET ALL USERS');
   try {
    const users = await UserService.getAllUser();
    return res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    console.log(`[USER CONTROLLER] : buscar => ${error}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
  };
  
  const getById = async (req, res) => {
    console.log('[USER CONTROLLER] : CHAMOU O MÉTODO GET BY ID');
    try {
      const { id } = req.params;
      const user = await UserService.getById(id);
      if (user.isError) return res.status(user.status).json(user.err);
      return res.status(StatusCodes.OK).json({ user });
    } catch (error) {
      console.log(`[USER CONTROLLER] : buscar => ${error}`);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  };
  const deleteUser = async (req, res) => {
    console.log('[USER CONTROLLER] : CHAMOU O MÉTODO DELETE');
    try {
      await UserService.deleteUser(req.user.dataValues.id);
      res.status(StatusCodes.NO_CONTENT).end();
    } catch (error) {
      console.log(`[USER CONTROLLER] : buscar => ${error}`);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  };
  module.exports = {
    createUser,
    userLogin,
    getAllUser,
    getById,
    deleteUser,
    
  }; 