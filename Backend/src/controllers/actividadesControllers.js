const Actividades = require('../models/Actividades');

exports.crearActividad = async (req, res) => {
    try {
        let actividad;
        actividad = new Actividades(req.body);
        await actividad.save();
        res.send(actividad);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al realizar la operación!');
    }
};

exports.verActividades = async(req, res)=>{
    try {
        let actividad = await Actividades.find();
        res.json(actividad);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al realizar la operación!');
    }
};


exports.actualizarActividad = async (req, res) => {
  try {
    const { nombreActividad, estatus } = req.body;
    let actividad = await Actividades.findById(req.params.id);

    if (!actividad) {
      return res.status(404).send("La actividad no fue encontrada");
    }

    if (nombreActividad) actividad.nombreActividad = nombreActividad;
    if (estatus) actividad.estatus = estatus;
    await actividad.save();
    res.send(actividad);

  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al actualizar la actividad");
  }
};

exports.obtenerActividad = async(req, res) => {
    console.log("ID encontrada!")
    let actividad = await Actividades.findOne({ _id: req.params.id });

    try {
        
    } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al actualizar la actividad");
    }
}

