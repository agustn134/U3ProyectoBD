const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const conectarDB = require('./config/db'); 
const cors = require("cors");

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

// 
conectarDB();
app.use(cors());


// Importar las rutas
const empleadoRoutes = require('./routes/empleadoRoutes');
const cursosRoutes = require('./routes/cursosRoutes');  // <-- FALTA ESTA LÍNEA

//
app.use('/api/empleados', empleadoRoutes);
app.use('/api/cursos', cursosRoutes);  

//
app.get('/', (req, res) => {
    res.send("Hola");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
