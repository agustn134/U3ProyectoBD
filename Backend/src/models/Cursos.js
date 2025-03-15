const mongoose = require('mongoose');

const cursosSchema = new mongoose.Schema({
    nombreEmpleado: { type: String, required: true },
    nombreCurso: { type: String, required: true },
    fechaInicio: { type: Date, default: Date.now },
    fechaTermino: { type: Date, default: Date.now },
    documentoEntregado: {
        tipoDocumento: { type: String, enum: ['Constancia', 'Título', 'Diploma'], required: true },
        rutaArchivo: { type: String, required: true }
    }
});

module.exports = mongoose.model('Cursos', cursosSchema);