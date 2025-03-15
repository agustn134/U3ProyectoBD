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

