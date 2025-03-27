const mongoose = require('mongoose');   

const actividadesSchema = mongoose.Schema({
    nombreEmpleado: { type: String, required: true},
    nombreActividad: { type: String, required: true },
    estatus : {type: String, requiered:true},
    fechaInicioActividad : {type: Date, default: Date.now },
    fechaTerminoActividad : {type: Date, default: Date.now }
});

module.exports = mongoose.model('Actividades', actividadesSchema);