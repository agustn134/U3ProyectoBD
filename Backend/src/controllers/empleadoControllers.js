const Empleado = require("../models/Empleado");

exports.crearEmpleado = async (req, res)=>{
    try {
        let empleado;
         empleado = new Empleado(req.body);

         await empleado.save();
         res.send(empleado);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al realizar la operación');
    }
}

exports.obterEmpleado = async (req, res) => {
    try {
        const empleados = await Empleado.find();
        res.json(empleados);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al realizar la operación');
    }
}

exports.actualizarEmpleado = async (req, res) => {
    try {
      console.log("Datos recibidos:", req.body); 
      const { claveEmpleado } = req.params;
      const empleadoActualizado = await Empleado.findOneAndUpdate(
        { claveEmpleado },
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!empleadoActualizado) {
        return res.status(404).json({ mensaje: "Empleado no encontrado" });
      }
  
      res.json(empleadoActualizado);
    } catch (error) {
      console.error("Error al actualizar:", error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  };


  exports.mostrarEmpleado = async (req, res) => {
    try {
      console.log("Clave recibida:", req.params.claveEmpleado); 
      let empleado = await Empleado.findOne({ claveEmpleado: req.params.claveEmpleado });
  
      if (!empleado) {
        return res.status(404).json({ msg: "No existe el Empleado" });
      }
  
      res.json(empleado);
    } catch (error) {
      console.error("Error al obtener el empleado", error);
      res.status(500).json({ msg: "Error al realizar la operación!!" });
    }
  };

  exports.eliminarEmpleado = async (req, res) => {
    try {
        console.log("Clave Recibida:", req.params.claveEmpleado);
        let empleado = await Empleado.findOne({ claveEmpleado: req.params.claveEmpleado });

        if (!empleado) {
            return res.status(404).json({ msg: "No existe el empleado" });
        }

        await Empleado.findOneAndDelete({ claveEmpleado: req.params.claveEmpleado });
        res.json({ msg: "Empleado eliminado exitosamente!" });

    } catch (error) {
        console.error("Error al eliminar el empleado:", error);
        res.status(500).json({ msg: "Error al realizar la operación!!" });
    }
};

exports.buscarEmpleados = async (req, res) => {
  try {
    let { termino } = req.query;
    
    if (!termino || termino.trim() === '') {
      return res.status(400).json({ mensaje: "El término de búsqueda es requerido" });
    }

    let consulta = {
      $or: [
        { claveEmpleado: { $regex: termino, $options: 'i' } },
        { RFC: { $regex: termino, $options: 'i' } },
        { 'nombreCompleto.apellidoPaterno': { $regex: termino, $options: 'i' } },
        { 'nombreCompleto.apellidoMaterno': { $regex: termino, $options: 'i' } }
      ]
    };

    let empleados = await Empleado.find(consulta);
    
    if (empleados.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron empleados con ese criterio de búsqueda" });
    }

    res.json(empleados);
  } catch (error) {
    console.error("Error en la búsqueda de empleados:", error);
    res.status(500).json({ mensaje: "Error al realizar la búsqueda" });
  }
};