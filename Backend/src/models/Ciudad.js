const mongoose = require('mongoose');   

const ciudadesSchema = mongoose.Schema({
    nombreCiudad: { type: String, required: true },
});

module.exports = mongoose.model('Ciudades', ciudadesSchema);