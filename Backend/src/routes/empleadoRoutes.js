// const express = require('express');
// const Empleado = require('../models/Empleado');
// const router = express.Router();
// const empleadoController = require('../controllers/empleadoControllers')

// // Crear un empleado
// router.post('/', empleadoController.crearEmpleado );
// // Obtener todos los empleados
// router.get('/', empleadoController.obterEmpleado);
// //Actualizar un empleado
// router.put('/:claveEmpleado', empleadoController.actualizarEmpleado);
// //Consultar un solo empleado mediate una id
// router.get('/:claveEmpleado', empleadoController.mostrarEmpleado);
// //Eliminar un Empleado
// router.delete('/:claveEmpleado', empleadoController.eliminarEmpleado);
// //Buscar empleado
// router.get('/buscar', empleadoController.buscarEmpleados);



// module.exports = router;





// Corrección en employeeRoutes.js
// El orden es importante en Express, la ruta específica debe ir antes de la dinámica

const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoControllers');

// Crear un empleado
router.post('/', empleadoController.crearEmpleado);

// Obtener todos los empleados
router.get('/', empleadoController.obterEmpleado);

// Buscar empleado (debe ir antes que las rutas con parámetros)
router.get('/buscar', empleadoController.buscarEmpleados);

// Actualizar un empleado
router.put('/:claveEmpleado', empleadoController.actualizarEmpleado);

// Consultar un solo empleado mediate una id
router.get('/:claveEmpleado', empleadoController.mostrarEmpleado);

// Eliminar un Empleado
router.delete('/:claveEmpleado', empleadoController.eliminarEmpleado);

module.exports = router;
