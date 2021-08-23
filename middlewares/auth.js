require('dotenv/config');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');
const { Users } = require('../models');

const schemaUserLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

const secret = process.env.JWT_SECRET;

const getToken = async (req, res) => {
  const { email, password } = req.body;
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const { error } = schemaUserLogin.validate({ email, password });
  if (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: error.details[0].message });
  }
const validUser = await Users.findOne({ where: { email, password } });
if (!validUser || validUser.password !== password) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: error.details[0].message });
  }

  const token = jwt.sign({ validUser }, secret, jwtConfig);
  
  res.status(StatusCodes.OK).json({ token });
};

module.exports = getToken;
