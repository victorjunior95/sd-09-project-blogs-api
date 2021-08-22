const Joi = require('@hapi/joi');

const minLengthName = 8;
const minLengthPassowrd = 6;

const validObjectCreateUsers = Joi.object({
  displayName: Joi.string().min(minLengthName).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().length(minLengthPassowrd).required(),
});

const validObjectLoginUser = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  .required(),
  password: Joi.string().required(),
});

const validateCreate = (displayName, email, password) => {
  const { error } = validObjectCreateUsers.validate({
    displayName,
    email,
    password,
  });

  if (error) {
    return {
          status: 400,
          error: {
            message: error.message,
          },
        };
  } 
};

const validateLogin = (email, password) => {
  const { error } = validObjectLoginUser.validate({
    email,
    password,
  });

  if (error) {
    return {
      status: 400,
      error: {
        message: error.message,
      },
    };
  }
};

module.exports = {
  validateCreate,
  validateLogin,
};