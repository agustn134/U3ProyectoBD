const mongoose = require('mongoose');
require('dotenv').config({path: '.env'});

const conectarDB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI)
        console.log('DB CONECTADA, JALANDO MACIZO ALV');
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = conectarDB;