const Cursos = require("../models/Cursos")


exports.crearCurso = async (req, res) => {
    try {
        let curso;
        curso = new Cursos(req.body);
        await curso.save();
        res.send(curso);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al realizar la operación!');
    }
};

exports.obtenerCursos = async (req, res) => {
    try {
        let curso = await Cursos.find();
        res.json(curso);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al realizar la operación!')
    } 
};

exports.actualizarCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreEmpleado, nombreCurso, fechaInicio, fechaTermino, documentoEntregado } = req.body;

        let curso = await Cursos.findById(id);

        if (!curso) {
            return res.status(404).json({ msg: 'No existe el curso' });
        }

        curso = await Cursos.findByIdAndUpdate(
            id,
            { nombreEmpleado, nombreCurso, fechaInicio, fechaTermino, documentoEntregado },
            { new: true } 
        );

        res.json(curso);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al realizar la operación!');
    }
};

exports.obtenerCursoId = async (req, res) => {
    try {
        console.log("ID ENCONTRATA, ESOO PADRE SANTOOOOO!!");
        let cursos = await Cursos.findOne({ _id: req.params.id });

        if(!cursos){
            return res.status(400).json({ msg:"El Curso no existe"});
        }else{
            res.json(cursos)
        }
    } catch (error) {
        console.log("Error al Buscar el Curso: ", error);
        res.status(500).json({ msg:"Error al hacer la operación!!!, FIJATE TONTO" });
    }
};

exports.eliminarCurso = async (req, res) => {
    try {
        console.log("ID ELIMINADA, :( ", req.params.id);
        let cursos = await Cursos.findById(req.params.id); 
        
        if (!cursos) {
            return res.status(404).json({ msg: "No existe el Curso" });
        } else {
            await Cursos.findByIdAndDelete(req.params.id); 
            return res.json({ msg: "El Curso se Eliminó, APROBADO POR CHAYANNE!!" });
        }

    } catch (error) {
        console.error("Hubo un error al eliminar el curso", error);
        return res.status(500).json({ msg: "Error al realizar la operación, fíjate" });
    }
};
