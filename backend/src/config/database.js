const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Tentando conectar ao MongoDB...');
    console.log('URI:', process.env.MONGODB_URI);

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'elestaoviajando',
    });

    console.log(`MongoDB Conectado: ${conn.connection.host}`);
    console.log('Database:', conn.connection.name);
    console.log(
      'Collections:',
      await conn.connection.db.listCollections().toArray(),
    );
  } catch (error) {
    console.error(`Erro na conexão com MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
