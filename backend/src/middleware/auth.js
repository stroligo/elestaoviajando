const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Por favor, faça autenticação.' });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if (req.user.role !== 'admin') {
        return res
          .status(403)
          .json({ error: 'Acesso negado. Apenas administradores.' });
      }
      next();
    });
  } catch (error) {
    res.status(401).json({ error: 'Por favor, faça autenticação.' });
  }
};

module.exports = {
  auth,
  adminAuth,
};
