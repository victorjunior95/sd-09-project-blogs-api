const { User } = require('../models');
const { validateCreate, validateLogin } = require('../middlewares/validUsers');

const create = async ({ displayName, email, password, image }) => {
  // valida se dados são validos
  const validateInfos = validateCreate(displayName, email, password);

  if (validateInfos) return validateInfos;

  // valida se email existe no banco de dados
  const verifyEmail = await User.findOne({ where: { email } });

  if (verifyEmail) {
    return {
      status: 409,
      error: { message: 'User already registered' },
    };
  }

  const newUser = await User.create({ displayName, email, password, image });
  return newUser;
};

const login = async ({ email, password }) => {
  // valida se foi enviado email e password
  const validLogin = validateLogin(email, password);
  if (validLogin) return validLogin;

  // valida se email existe no banco de dados
  const verifyEmail = await User.findOne({ where: { email } });
  
  if (!verifyEmail || verifyEmail.dataValues.password !== password) {
    return {
      status: 400,
      error: {
        message: 'Invalid fields',
      },
    };
  }

  return {
    status: 200,
    user: verifyEmail,
  };
};

const getAllUsers = async () => {
  const result = await User.findAll();

  return result;
};

const getUserById = async (id) => {
  const result = await User.findByPk(id);

  if (!result) {
    return {
      status: 404, 
      error: {
        message: 'User does not exist',
      },
    };
  }
  return result;
};

module.exports = {
  create,
  login,
  getAllUsers,
  getUserById,
};