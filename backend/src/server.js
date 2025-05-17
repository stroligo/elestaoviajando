require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const corsMiddleware = require('./middleware/cors-middleware');
const routes = require('./routes');

const app = express();

// Verificar se JWT_SECRET está definido
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET não está definido no arquivo .env');
  process.exit(1);
}

// Conectar ao MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB:', mongoose.connection.db.databaseName);
    return mongoose.connection.db.listCollections().toArray();
  })
  .then((collections) => {
    const nomesDasColecoes = collections.map((c) => c.name);
    console.log('Coleções disponíveis:', nomesDasColecoes);
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  });

// Middlewares globais
app.use(corsMiddleware());
app.use(express.json());

// Usando todas as rotas centralizadas
app.use('/api', routes);

// Rota raiz
app.get('/', (req, res) => {
  res.json({ message: 'API - Projeto Elas Tão Viajando' });
});

// Tratamento de rotas não existentes
app.use((req, res) => {
  res.status(404).json({ message: 'Esta rota não existe' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
