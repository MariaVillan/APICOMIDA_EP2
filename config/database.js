const { MongoClient } = require('mongodb');
require('dotenv').config(); // Asegúrate de que dotenv esté configurado correctamente

const uri = process.env.MONGODB_URI; // Asegúrate de que MONGODB_URI está definido en tu archivo .env

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas successfully!");
  } catch (error) {
    console.error("Failed to connect to MongoDB Atlas", error);
    throw error;
  }
}

module.exports = connectDB;
