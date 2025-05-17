require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function createAdminUser() {
  try {
    // Conectar ao MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado ao MongoDB');

    // Verificar se já existe um admin
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      console.log('Já existe um usuário administrador');
      process.exit(0);
    }

    // Criar usuário admin
    const admin = new User({
      name: 'Administrador',
      email: 'admin@elestaoviajando.com',
      password: 'admin123',
      role: 'admin',
    });

    await admin.save();
    console.log('Usuário administrador criado com sucesso!');
    console.log('Email:', admin.email);
    console.log('Senha: admin123');
    console.log('Por favor, altere a senha após o primeiro login.');
  } catch (error) {
    console.error('Erro ao criar usuário administrador:', error);
  } finally {
    await mongoose.connection.close();
  }
}

createAdminUser();
