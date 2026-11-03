import express from "express";
import Doctor from "../modelos/Doctor.js";

const router = express.Router();

// OBTENER TODOS LOS DOCTORESS
router.get("/", async (req, res) => {
  try {
    const doctores = await Doctor.find();
    res.json(doctores);
  } catch (error) {
    console.error("ERROR AL OBTENER DOCTORES:", error);
    res.status(500).json({
      mensaje: "Error al obtener los doctores",
    });
  }
});

// OBTENER DOCTORES POR ESPECIALIDAD
router.get("/especialidad/:especialidad", async (req, res) => {
  try {
    const doctores = await Doctor.find({
      espedoc: req.params.especialidad,
    });

    res.json(doctores);
  } catch (error) {
    console.error("ERROR AL BUSCAR DOCTORES:", error);

    res.status(500).json({
      mensaje: "Error al buscar doctores por especialidad",
    });
  }
});

// CREAR DOCTOR
router.post("/", async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body);

    // Buscar el último doctor registrado
    const ultimoDoctor = await Doctor.findOne().sort({ iddoc: -1 });

    // Calcular el siguiente identificador
    let nuevoId = 1;

    if (ultimoDoctor && ultimoDoctor.iddoc) {
      nuevoId =
        parseInt(ultimoDoctor.iddoc.replace("DOC", "")) + 1;
    }

    // Generar identificador automático
    const iddoc = "DOC" + String(nuevoId).padStart(3, "0");

    // Crear el doctor con su identificador
    const doctor = new Doctor({
      ...req.body,
      iddoc: iddoc,
    });

    const nuevoDoctor = await doctor.save();

    res.status(201).json(nuevoDoctor);

  } catch (error) {
    console.error("ERROR AL CREAR DOCTOR:", error);

    res.status(500).json({
      mensaje: "Error al crear el doctor",
      error: error.message,
    });
  }
});


// ACTUALIZAR doctor
router.put("/:id", async (req, res) => {
  try {
    const doctorActualizado = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!doctorActualizado) {
      return res.status(404).json({
        mensaje: "Doctor no encontrado",
      });
    }

    res.json(doctorActualizado);
  } catch (error) {
    console.error("ERROR AL ACTUALIZAR DOCTOR:", error);
    res.status(500).json({
      mensaje: "Error al actualizar el doctor",
    });
  }
});

// ELIMINAR doctor
router.delete("/:id", async (req, res) => {
  try {
    const doctorEliminado = await Doctor.findByIdAndDelete(
      req.params.id
    );

    if (!doctorEliminado) {
      return res.status(404).json({
        mensaje: "Doctor no encontrado",
      });
    }

    res.json(doctorEliminado);

  } catch (error) {
    console.error("ERROR AL ELIMINAR DOCTOR:", error);

    res.status(500).json({
      mensaje: "Error al eliminar el doctor",
    });
  }
});

export default router;