const mongoose = require("mongoose");
require("dotenv").config();

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); 
    console.log("DB CONECTADA, JALANDO MACIZO ALV");
  } catch (error) {
    console.error(" ERROR DE CONEXIÓN:", error);
    process.exit(1);
  }
};

module.exports = conectarDB;

