const LoginSevices = require('../services/loginServices');

const login = async (req, res) => {
  const { body } = req;
  const token = await LoginSevices.login(body);
  return res.status(200).json({ token });
};

module.exports = {
  login,
};