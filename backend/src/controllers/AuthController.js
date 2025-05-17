const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthController {
  // Registro de usuário
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email já cadastrado.' });
      }

      const user = new User({
        name,
        email,
        password,
      });

      await user.save();

      const token = jwt.sign(
        { _id: user._id.toString() },
        process.env.JWT_SECRET,
      );

      res.status(201).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Email ou senha inválidos.' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Email ou senha inválidos.' });
      }

      const token = jwt.sign(
        { _id: user._id.toString() },
        process.env.JWT_SECRET,
      );

      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Obter dados do usuário atual
  async getCurrentUser(req, res) {
    try {
      res.json({
        user: {
          _id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          role: req.user.role,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
