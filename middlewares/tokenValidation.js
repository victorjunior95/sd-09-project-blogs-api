require('dotenv/config');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const secret = process.env.JWT_SECRET;
const UNAUTHORIZED = 401;

const tokenValidation = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    
    if (!token) { 
     return res.status(UNAUTHORIZED).json({ message: 'Token not found' }); 
}
    const { email, password } = jwt.verify(token, secret);
    
    const user = await Users.findOne({ where: { email, password } });
    
    if (!user) return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });

    req.user = user;
  
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { tokenValidation };
