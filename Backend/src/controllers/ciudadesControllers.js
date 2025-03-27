const Ciudad = require('../models/Ciudad');

// Crear ciudad
exports.crearCiudad = async (req, res) => {
    try {
        let ciudad;
        ciudad = new Ciudad(req.body);
        await ciudad.save();
        res.json(ciudad);  // Responder con la ciudad recién creada
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al realizar la operación!');
    }
};

// Ver todas las ciudades
exports.verCiudades = async (req, res) => {
    try {
        let ciudades = await Ciudad.find();  // Buscar todas las ciudades
        res.json(ciudades);  // Devolver todas las ciudades en formato JSON
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al realizar la operación!');
    }
};

// Actualizar ciudad
exports.actualizarCiudad = async (req, res) => {
    try {
        const { nombreCiudad } = req.body;  // Extraer el nombre de la ciudad desde el cuerpo de la solicitud
        let ciudad = await Ciudad.findById(req.params.id);  // Buscar la ciudad por ID

        if (!ciudad) {
            return res.status(404).send("La ciudad no fue encontrada");
        }

        if (nombreCiudad) ciudad.nombreCiudad = nombreCiudad;  // Si se proporciona un nombre de ciudad, actualizarlo
        await ciudad.save();  // Guardar los cambios
        res.json(ciudad);  // Devolver la ciudad actualizada

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error al actualizar la ciudad");
    }
};

// Obtener una ciudad por ID
exports.obtenerCiudad = async (req, res) => {
    try {
        console.log("ID encontrada:", req.params.id);
        let ciudad = await Ciudad.findOne({ _id: req.params.id });  // Buscar la ciudad por ID

        if (!ciudad) {
            return res.status(404).json({ msg: "La ciudad no fue encontrada" });
        }

        res.json(ciudad);  // Devolver la ciudad encontrada
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error al obtener la ciudad");
    }
}
