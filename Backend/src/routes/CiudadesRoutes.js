const express = require('express');
const router = express.Router();
const ciudadesControllers = require('../controllers/ciudadesControllers');

// Crear una ciudad
router.post('/', ciudadesControllers.crearCiudad);

// Ver todas las ciudades
router.get('/', ciudadesControllers.verCiudades);

// Ver ciudad por ID
router.get('/:id', ciudadesControllers.obtenerCiudad);

// Actualizar ciudad por ID
router.put('/:id', ciudadesControllers.actualizarCiudad);

module.exports = router;
