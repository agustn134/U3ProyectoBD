const mongoose = require('mongoose');

const empleadoSchema = new mongoose.Schema({
  claveEmpleado: { type: String, unique: true, required: true },
  nombreCompleto: {
    nombre: { type: String, required: true },
    apellidoPaterno: { type: String, required: true },
    apellidoMaterno: { type: String, required: true },
  },
  fechaAlta: { type: Date, default: Date.now },
  RFC: { type: String, required: true, unique: true },
  fechaNacimiento: { type: Date, required: true },
  sexo: { type: String, enum: ['Masculino', 'Femenino'], required: true },
  foto: { type: String, default: "" },
  domicilio: {
    calle: { type: String, required: true },
    numeroInterior: { type: String, default: "" },
    numeroExterior: { type: String, required: true },
    colonia: { type: String, required: true },
    codigoPostal: { type: String, required: true },
    ciudad: { type: String, required: true },
  },
  departamento: { type: String, required: true },
  puesto: { type: String, required: true },
  telefono: [{ type: String, required: true }],
  correoElectronico: [{ type: String }],
  referencias: [
    {
      nombreFamiliar: { type: String, required: true },
      parentesco: { type: String, required: true },
      telefonoFamiliar: { type: String, required: true },
      correoElectronicoFamiliar: { type: String, default: "" },
    },
  ],
  cursosEmpleado:[{type: String}]
});

module.exports = mongoose.model('Empleado', empleadoSchema);
