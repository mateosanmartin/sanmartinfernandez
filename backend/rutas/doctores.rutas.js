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

// CREAR DOCTOR
router.post("/", async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body);

    const doctor = new Doctor(req.body);
    const nuevoDoctor = await doctor.save();

    res.status(201).json(nuevoDoctor);
  } catch (error) {
    console.error("ERROR AL CREAR doctor:", error);
    res.status(500).json({
      mensaje: "Error al crear el doctor",
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