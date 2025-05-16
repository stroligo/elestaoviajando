require('dotenv').config();
const mongoose = require('mongoose');
const Trip = require('./models/Trip');
const fs = require('fs');
const path = require('path');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erro: ${error.message}`);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    // Conectar ao MongoDB
    await connectDB();

    // Ler o arquivo data.json
    const dataPath = path.join(
      __dirname,
      '../../elestaoviajando/public/data/data.json',
    );
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Limpar a coleção existente
    await Trip.deleteMany({});

    // Inserir os dados
    const trips = data.trip.map((trip) => ({
      ...trip,
      date: new Date(trip.date),
    }));

    await Trip.insertMany(trips);
    console.log('Dados importados com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao importar dados:', error);
    process.exit(1);
  }
};

seedDatabase();
