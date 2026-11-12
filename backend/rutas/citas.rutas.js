import express from "express";
import mongoose from "mongoose";
import Cita from "../modelos/Cita.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filtro = {};

    if (req.query.pacienteId) {
      if (!mongoose.isValidObjectId(req.query.pacienteId)) {
        return res.status(400).json({ error: "Paciente non válido" });
      }

      filtro.pacienteId = req.query.pacienteId;
    }

    const citas = await Cita.find(filtro)
      .populate("pacienteId", "dnipac nomepac apelpac")
      .populate("doctorId", "iddoc nomedoc apeldoc")
      .sort({ fecha: 1, hora: 1 });

    res.json(citas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const cita = new Cita(req.body);
    const citaGuardada = await cita.save();

    res.status(201).json(citaGuardada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "ID non válido" });
    }

    const cita = await Cita.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!cita) {
      return res.status(404).json({ error: "Cita non atopada" });
    }

    res.json(cita);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "ID non válido" });
    }

    const cita = await Cita.findByIdAndDelete(req.params.id);

    if (!cita) {
      return res.status(404).json({ error: "Cita non atopada" });
    }

    res.json({ mensaje: "Cita eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
