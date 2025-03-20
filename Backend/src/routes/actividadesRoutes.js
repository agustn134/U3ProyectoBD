const express = require('express');
const router = express.Router();
const actividadesControllers = require('../controllers/actividadesControllers');
//Crear una actividad 
router.post('/', actividadesControllers.crearActividad);
//Ver Actividades
router.get('/', actividadesControllers.verActividades);
//Ver un curso por id
router.put('/:id', actividadesControllers.actualizarActividad);
//Ver cursos por id
router.get('/:id', actividadesControllers.obtenerActividad);

module.exports = router;