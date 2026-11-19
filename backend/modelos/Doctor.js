
// Importamos Mongoose para definir el esquema del doctor.
import mongoose from "mongoose";

/*
  ESQUEMA DE DOCTOR

  Cada propiedad representa un campo del documento.

  String:
  Almacena texto.

  Boolean:
  Almacena true o false.

  required: true:
  Indica que Mongoose exige ese campo al crear
  y validar un documento.

  MongoDB proporciona automáticamente un _id
  único a cada doctor.
*/
const DoctorSchema = new mongoose.Schema({
    // Nombre del doctor.
    nomedoc: {type: String, required: true},

    // Apellidos del doctor.
    apeldoc: {type: String, required: true},

    // Indica si está colegiado. Es un booleano.
    coledoc: {type: Boolean, required: true},

    // Número de teléfono móvil.
    movildoc: {type: String, required: true},

    // Correo electrónico.
    maildoc: {type: String, required: true},

    // Especialidad médica del doctor.
    espedoc: {type: String, required: true},
},
{
    // Nombre de la colección donde se guardarán los doctores.
    collection: "doctores"
})

/*
  Creamos y exportamos el modelo Doctor.

  El nombre "Doctor" también es importante porque
  el modelo Cita lo utiliza como referencia
  en su propiedad doctorId.
*/
export default mongoose.model("Doctor", DoctorSchema)
