
// Importamos Express para definir las rutas HTTP.
import express from "express";

// Importamos el modelo Paciente para acceder a MongoDB.
import Paciente from "../modelos/Paciente.js";

/*
  express.Router() crea un enrutador.

  Permite agrupar las rutas relacionadas con pacientes.

  La ruta completa depende del prefijo configurado
  en server.js.
*/
const router = express.Router();

// OBTENER TODOS LOS PACIENTES
/*
  GET "/"

  OBJETIVO:
  Obtener todos los pacientes de MongoDB.

  req:
  Contiene información de la petición HTTP.

  res:
  Permite enviar la respuesta al cliente.

  Paciente.find():
  Busca todos los documentos de la colección.

  await:
  Espera a que termine la consulta.

  res.json(pacientes):
  Envía los resultados en formato JSON.

  Si falla la consulta:
  - catch captura el error.
  - status(500) indica un error del servidor.
*/
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
/*
  POST "/"

  OBJETIVO:
  Crear un paciente nuevo.

  req.body:
  Contiene los datos enviados por el frontend.

  new Paciente(req.body):
  Construye un documento Mongoose con esos datos.

  paciente.save():
  Guarda el documento en MongoDB.

  status(201):
  Indica que se ha creado un recurso correctamente.

  Si falla:
  Se responde con HTTP 500.
*/
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
/*
  PUT "/:id"

  OBJETIVO:
  Actualizar un paciente por su identificador.

  :id:
  Parámetro dinámico de la URL.

  req.params.id:
  Obtiene el identificador recibido en la ruta.

  req.body:
  Contiene los nuevos datos del paciente.

  findByIdAndUpdate():
  Busca un documento por su _id y lo actualiza.

  OPCIONES:
  new: true
  Devuelve el documento actualizado, no el anterior.

  runValidators: true
  Ejecuta las validaciones del esquema durante
  la actualización.

  Si no encuentra el paciente:
  Devuelve HTTP 404.

  Si ocurre un error:
  Devuelve HTTP 500.
*/
router.put("/:id", async (req, res) => {
  try {
    const pacienteActualizado = await Paciente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
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
/*
  DELETE "/:id"

  OBJETIVO:
  Eliminar un paciente de MongoDB.

  findByIdAndDelete():
  Busca un documento mediante su _id y lo elimina.

  Si encuentra el paciente:
  Devuelve el documento eliminado como JSON.

  Si no existe:
  Devuelve HTTP 404.

  Si ocurre un error:
  Devuelve HTTP 500.
*/
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

/*
  Exportamos el router para poder utilizarlo
  desde el archivo principal del servidor.
*/
export default router;
