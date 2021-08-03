const invalidEmail = {
  status: 400,
  message: '"email" must be a valid email',
};

const requiredEmail = {
  message: '"email" is required',
  status: 400,
};

const emailAlreadyRegistered = {
  status: 409,
  message: 'User already registered',
};

const emptyEmail = {
  message: '"email" is not allowed to be empty',
  status: 400,
};

const emptyPassword = {
  message: '"password" is not allowed to be empty',
  status: 400,
};

const invalidFields = {
  message: 'Invalid fields',
  status: 400,
};

const shortDisplayName = {
  message: '"displayName" length must be at least 8 characters long',
  status: 400,
};

const shortPassword = {
  message: '"password" length must be 6 characters long',
  status: 400,
};

const requiredPassword = {
  message: '"password" is required',
  status: 400,
};

module.exports = {
  invalidEmail,
  requiredEmail,
  emailAlreadyRegistered,
  shortDisplayName,
  shortPassword,
  requiredPassword,
  emptyEmail,
  emptyPassword,
  invalidFields,
}; 