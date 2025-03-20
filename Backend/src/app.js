// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const conectarDB = require('./config/db');
// const cors = require("cors");

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// app.use(express.json());

// //
// conectarDB();
// app.use(cors());


// // Importar las rutas
// const empleadoRoutes = require('./routes/empleadoRoutes');
// const cursosRoutes = require('./routes/cursosRoutes');  // <-- FALTA ESTA LÍNEA
// const actividadesRoutes = require('./routes/actividadesRoutes');
// const uploadsRoutes = require('./routes/uploadsRoutes');

// //
// app.use('/api/empleados', empleadoRoutes);
// app.use('/api/cursos', cursosRoutes);
// app.use('/api/actividades', actividadesRoutes);
// app.use('/api/uploads', uploadsRoutes);
// app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
// //
// app.get('/', (req, res) => {
//     res.send("Hola");
// });

// app.listen(PORT, () => {
//     console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });















const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const conectarDB = require('./config/db');
const cors = require("cors");
const path = require('path'); // Añadir esta línea para importar el módulo path

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

//
conectarDB();
app.use(cors());


// Importar las rutas
const empleadoRoutes = require('./routes/empleadoRoutes');
const cursosRoutes = require('./routes/cursosRoutes');
const actividadesRoutes = require('./routes/actividadesRoutes');
const uploadsRoutes = require('./routes/uploadsRoutes');

//
app.use('/api/empleados', empleadoRoutes);
app.use('/api/cursos', cursosRoutes);
app.use('/api/actividades', actividadesRoutes);
app.use('/api/uploads', uploadsRoutes);

// Servir archivos estáticos para todas las subcarpetas de uploads
 app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// app.use('/uploads', express.static(path.join(__dirname, '../public/uploads/documentos')));
// app.use('/uploads/documentos', express.static(path.join(__dirname, '../public/uploads/documentos')));
// app.use('/uploads/cursos', express.static(path.join(__dirname, '../public/uploads/cursos')));
//
// app.get('/', (req, res) => {
//     res.send("Hola");
// });

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});














