const express = require('express');
const Empleado = require('../models/Empleado');
const router = express.Router();

// Crear un empleado
router.post('/', async (req, res) => {
  try {
    const empleado = new Empleado(req.body);
    await empleado.save();
    res.status(201).json(empleado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todos los empleados
router.get('/', async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;