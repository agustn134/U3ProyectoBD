const express = require('express');
const Empleado = require('../models/Empleado');
const router = express.Router();
const empleadoController = require('../controllers/empleadoControllers')

// Crear un empleado
router.post('/', empleadoController.crearEmpleado );
// Obtener todos los empleados
router.get('/', empleadoController.obterEmpleado);
//Actualizar un empleado
router.put('/:claveEmpleado', empleadoController.actualizarEmpleado);
//Consultar un solo empleado mediate una id
router.get('/:claveEmpleado', empleadoController.mostrarEmpleado);
//Eliminar un Empleado
router.delete('/:claveEmpleado', empleadoController.eliminarEmpleado);
//Buscar empleado
router.get('/buscar', empleadoController.buscarEmpleados);



module.exports = router;
