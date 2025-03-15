const express = require('express');
const router = express.Router();
const cursosControllers = require('../controllers/cursosControllers');  


// Crear un Curso
router.post('/', cursosControllers.crearCurso);
//Ver todos los cursos
router.get('/', cursosControllers.obtenerCursos);
//Ver un curso por id
router.put('/:id', cursosControllers.actualizarCurso);
//Ver cursos por id
router.get('/:id', cursosControllers.obtenerCursoId);
//Eliminar Curso
router.delete('/:id', cursosControllers.eliminarCurso);


module.exports = router;


