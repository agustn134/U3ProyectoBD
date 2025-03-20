// 4. Rutas para uploads (routes/uploadsRoutes.js)
const express = require('express');
const router = express.Router();
const uploadsController = require('../controllers/uploadsController');

// Ruta para subir un archivo
router.post('/', uploadsController.uploadFile, uploadsController.processUpload);

module.exports = router;
