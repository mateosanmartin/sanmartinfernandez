import express from "express";
import Paciente from "../modelos/Paciente.js";

const router = express.Router();

// OBTENER TODOS LOS PACIENTES
router.get("/", async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (error) {
    console.error("ERROR AL OBTENER PACIENTES:", error);
    res.status(500).json({
      mensaje: "Error al obtener los pacientes",
    });
  }
});

// CREAR PACIENTE
router.post("/", async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body);

    const paciente = new Paciente(req.body);
    const nuevoPaciente = await paciente.save();

    res.status(201).json(nuevoPaciente);
  } catch (error) {
    console.error("ERROR AL CREAR PACIENTE:", error);
    res.status(500).json({
      mensaje: "Error al crear el paciente",
    });
  }
});

// ACTUALIZAR PACIENTE
router.put("/:id", async (req, res) => {
  try {
    const pacienteActualizado = await Paciente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!pacienteActualizado) {
      return res.status(404).json({
        mensaje: "Paciente no encontrado",
      });
    }

    res.json(pacienteActualizado);
  } catch (error) {
    console.error("ERROR AL ACTUALIZAR PACIENTE:", error);
    res.status(500).json({
      mensaje: "Error al actualizar el paciente",
    });
  }
});

// ELIMINAR PACIENTE
router.delete("/:id", async (req, res) => {
  try {
    const pacienteEliminado = await Paciente.findByIdAndDelete(
      req.params.id
    );

    if (!pacienteEliminado) {
      return res.status(404).json({
        mensaje: "Paciente no encontrado",
      });
    }

    res.json(pacienteEliminado);

  } catch (error) {
    console.error("ERROR AL ELIMINAR PACIENTE:", error);

    res.status(500).json({
      mensaje: "Error al eliminar el paciente",
    });
  }
});

export default router;