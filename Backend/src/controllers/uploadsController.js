// 3. Controlador para uploads (controllers/uploadsController.js)
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const { tipo = 'documentos' } = req.body;
    const dir = `./public/uploads/${tipo}`;

    // Crear directorio si no existe
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: function(req, file, cb) {
    // Generar nombre único para el archivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

// Filtro de archivos
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Aceptar archivo
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo se permiten PDF, imágenes y documentos Word.'), false);
  }
};

// Configuración de multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Límite de 5MB por archivo
});

exports.uploadFile = upload.single('file');

exports.processUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No se ha enviado ningún archivo' });
  }

  // Devolver la URL del archivo subido
  const fileUrl = `/uploads/${req.body.tipo || 'documentos'}/${req.file.filename}`;
  return res.json({
    msg: 'Archivo subido con éxito',
    file: {
      name: req.file.filename,
      url: fileUrl,
      size: req.file.size,
      mime: req.file.mimetype
    }
  });
};

