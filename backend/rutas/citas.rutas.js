

// Importamos Express para definir las rutas.
import express from "express";

// Importamos Mongoose para comprobar identificadores.
import mongoose from "mongoose";

// Importamos el modelo Cita para acceder a MongoDB.
import Cita from "../modelos/Cita.js";

import Doctor from "../modelos/Doctor.js";

// Creamos el enrutador.
const router = express.Router();

// OBTENER CITAS
/*
  GET "/"

  OBJETIVO:
  Obtener todas las citas o solamente las citas
  de un paciente concreto.

  PASO 1: CREAR EL FILTRO

  const filtro = {}:
  Creamos un objeto vacío.

  Si no añadimos ninguna propiedad,
  Cita.find(filtro) buscará todas las citas.

  PASO 2: COMPROBAR EL DNI

  req.query.pacienteDNI:
  Obtiene el parámetro pacienteDNI de la URL.

  EJEMPLO:
  /api/citas?pacienteDNI=12345678Z

  Si existe ese parámetro, añadimos
  la propiedad pacienteDNI al objeto filtro.

  PASO 3: CONSULTAR MONGODB

  Cita.find(filtro):
  Busca las citas que cumplen el filtro.

  PASO 4: POPULATE

  populate("doctorId", "nomedoc apeldoc"):

  Sustituye la referencia doctorId por los datos
  del doctor relacionado.

  "nomedoc apeldoc" indica qué campos
  del doctor queremos recuperar.

  PASO 5: ORDENAR

  sort({ fecha: 1, hora: 1 }):

  Ordena primero por fecha y después por hora.

  1 significa orden ascendente.
  -1 significaría orden descendente.

  PASO 6: RESPONDER

  res.json(citas):
  Envía las citas al frontend.

  Si ocurre un error:
  Devuelve HTTP 500.
*/
router.get("/", async (req, res) => {
  try {
    const filtro = {};

    // Filtrar por DNI del paciente
    if (req.query.pacienteDNI) {
      filtro.pacienteDNI = req.query.pacienteDNI;
    }

    const citas = await Cita.find(filtro)
      .populate("doctorId", "nomedoc apeldoc")
      .sort({ fecha: 1, hora: 1 });

    res.json(citas);

  } catch (error) {
    console.error("Error ao cargar citas:", error);
    res.status(500).json({ error: error.message });
  }
});

// CREAR CITA
/*
  POST "/"

  OBJETIVO:
  Crear una cita nueva.

  req.body:
  Contiene los datos enviados desde Vue.

  new Cita(req.body):
  Construye el documento de la cita.

  cita.save():
  Guarda el documento en MongoDB.

  HTTP 201:
  Indica que la cita se ha creado.

  HTTP 400:
  Se utiliza aquí cuando ocurre un error
  al crear la cita.

  error.message:
  Devuelve el mensaje del error producido.
*/
router.post("/", async (req, res) => {
  try {
    const cita = new Cita(req.body);
    const citaGuardada = await cita.save();

    res.status(201).json(citaGuardada);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ACTUALIZAR CITA
/*
  PUT "/:id"

  OBJETIVO:
  Actualizar una cita existente.

  PASO 1: VALIDAR EL IDENTIFICADOR

  mongoose.isValidObjectId(req.params.id):
  Comprueba si el valor recibido tiene
  un formato válido de ObjectId de MongoDB.

  El operador ! significa negación.

  Si el identificador no es válido:
  Devolvemos HTTP 400 y terminamos con return.

  PASO 2: ACTUALIZAR

  findByIdAndUpdate() recibe:
  - Identificador de la cita.
  - Nuevos datos.
  - Opciones de actualización.

  new: true:
  Devuelve el documento actualizado.

  runValidators: true:
  Ejecuta las validaciones del esquema.

  PASO 3: COMPROBAR EXISTENCIA

  Si no se encuentra la cita:
  Devuelve HTTP 404.

  PASO 4: RESPONDER

  Si todo funciona:
  Envía la cita actualizada como JSON.

  Si ocurre un error:
  Devuelve HTTP 400.
*/
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

// ELIMINAR CITA
/*
  DELETE "/:id"

  OBJETIVO:
  Eliminar una cita por su identificador.

  PASO 1:
  Comprobamos que el ID recibido sea válido.

  Si no lo es:
  Devolvemos HTTP 400.

  PASO 2:
  findByIdAndDelete() busca la cita por _id
  y la elimina de MongoDB.

  PASO 3:
  Si no encuentra la cita:
  Devolvemos HTTP 404.

  PASO 4:
  Si la eliminación funciona:
  Devolvemos un objeto JSON con un mensaje.

  PASO 5:
  Si ocurre un error:
  Devolvemos HTTP 500.

  DIFERENCIA CON PACIENTES Y DOCTORES:
  Aquí devolvemos un mensaje de confirmación,
  no el documento eliminado.
*/
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

// Exportamos las rutas de citas.
export default router;
