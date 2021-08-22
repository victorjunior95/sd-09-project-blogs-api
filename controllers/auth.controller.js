const jwt = require('jsonwebtoken');
const { Users } = require('../models/index');

const secret = 'sd-09-trybe-regoraphael';

const tokenVerification = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const { payload: { id } } = jwt.verify(authorization, secret);
    const user = await Users.findByPk(id);

    if (!user) return res.status(401).json({ message: 'Expired or invalid token' });
    req.params.loggedUserId = id;
    
    return next();
  } catch (error) { return res.status(401).json({ message: 'Expired or invalid token' }); }
};

module.exports = {
  tokenVerification,
};
