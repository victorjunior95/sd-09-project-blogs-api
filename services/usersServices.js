const Joi = require('@hapi/joi');

const createJWT = require('./jwt');
const { User } = require('../models');
const { Error400, Error404, Error409, Error500 } = require('../errors/index');

const userSchema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});

const checkFields = (userData) => {
  const { error } = userSchema.validate(userData);
  if (error) {
    const { message } = error.details[0];
    throw new Error400(message);
  }
};

const add = async (userData) => {
  checkFields(userData);
  try {
    const response = await User.create(userData);
    const { password, ...userDataToken } = response.toJSON();
    const token = createJWT(userDataToken);
    return token;
  } catch (err) {
    throw new Error409('User already registered');
  }
};

const getAll = async () => {
  try {
    const response = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    return response;
  } catch (err) {
    throw new Error500('Internal Error');
  }
};

const getById = async (id) => {
  let response;
  try {
    response = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
  } catch (err) {
    throw new Error500('Internal Error');
  }
  if (!response) throw new Error404('User does not exist');
  return response;
};

const deleteSelf = async (id) => {
  try {
    await User.destroy({ where: { id } });
  } catch (err) {
    throw new Error500('Internal Error');
  }
};

module.exports = {
  add,
  getAll,
  getById,
  deleteSelf,
};