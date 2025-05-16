require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const corsMiddleware = require('./middleware/cors-middleware');
const apiRouter = require('./routes/routes');
const uploadRoutes = require('./routes/upload');

const app = express();

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

// Rotas de upload de imagens (antes do roteador geral)
app.use('/api/upload', uploadRoutes);

// Roteador principal da API
app.use('/api', apiRouter);

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
