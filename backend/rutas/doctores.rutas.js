
// Importamos Express y el modelo Doctor.
import express from "express";
import Doctor from "../modelos/Doctor.js";

// Creamos el enrutador para las operaciones con doctores.
const router = express.Router();

// OBTENER TODOS LOS DOCTORESS
/*
  GET "/"

  Doctor.find():
  Obtiene todos los doctores de MongoDB.

  res.json():
  Envía el array al frontend.

  Si falla la consulta, devolvemos HTTP 500.
*/
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
/*
  GET "/especialidad/:especialidad"

  OBJETIVO:
  Obtener los doctores que pertenecen
  a una especialidad concreta.

  :especialidad:
  Es un parámetro dinámico de la ruta.

  req.params.especialidad:
  Obtiene el valor recibido en la URL.

  Doctor.find({ espedoc: ... }):
  Busca únicamente los documentos cuyo campo
  espedoc coincida con ese valor.

  EJEMPLO:
  /especialidad/Pediatría

  Busca doctores cuyo espedoc sea "Pediatría".

  DIFERENCIA CON Doctor.find():
  find() sin filtro devuelve todos.
  find({ campo: valor }) devuelve coincidencias.
*/
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
/*
  POST "/"

  OBJETIVO:
  Crear un doctor nuevo.

  req.body:
  Datos enviados desde Vue.

  new Doctor(req.body):
  Construye un documento con el esquema Doctor.

  doctor.save():
  Guarda el documento en MongoDB.

  HTTP 201:
  Doctor creado correctamente.

  En caso de error, también enviamos error.message,
  que contiene el mensaje del error de Mongoose.
*/
router.post("/", async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body);

    const doctor = new Doctor(req.body);

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
/*
  PUT "/:id"

  OBJETIVO:
  Modificar un doctor existente.

  req.params.id:
  Identificador del doctor recibido por URL.

  req.body:
  Nuevos datos enviados por el frontend.

  findByIdAndUpdate():
  Busca y actualiza el documento.

  new: true:
  Devuelve el documento actualizado.

  IMPORTANTE:
  Esta ruta no incluye runValidators: true.
  La conservamos exactamente como está
  en tu archivo original.

  Si no encuentra el doctor:
  HTTP 404.

  Si falla la operación:
  HTTP 500.
*/
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
/*
  DELETE "/:id"

  OBJETIVO:
  Eliminar un doctor de MongoDB.

  findByIdAndDelete():
  Busca el documento por su identificador
  y lo elimina.

  Si no existe:
  Devuelve HTTP 404.

  Si se elimina:
  Devuelve el documento eliminado.

  Si ocurre un error:
  Devuelve HTTP 500.
*/
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

// Exportamos las rutas de doctores.
export default router;
