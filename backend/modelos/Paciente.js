
// Importamos Mongoose, que permite trabajar con MongoDB mediante modelos y esquemas.
import mongoose from 'mongoose';

/*
  MODELO PACIENTE

  mongoose.Schema() define la estructura de los documentos
  que se guardarán en la colección de MongoDB.

  Primer argumento:
  Objeto con los campos y sus tipos.

  Segundo argumento:
  Opciones del esquema, como el nombre de la colección.

  type: String -> el campo almacena texto.
  required: true -> el campo es obligatorio.
  required: false -> el campo es opcional.

  Mongoose genera automáticamente un campo _id
  para identificar cada documento.
*/
const PacienteSchema = new mongoose.Schema(
{
    // DNI o NIE del paciente. Obligatorio.
    dnipac: { type: String, required: true},

    // Nombre del paciente. Obligatorio.
    nomepac: {type: String, required: true},

    // Apellidos del paciente. Obligatorio.
    apelpac: {type: String, required: true},

    // Fecha de nacimiento, almacenada como texto.
    nacipac: {type: String, required: true},

    // Correo electrónico. Opcional.
    mailpac: {type: String, required: false},

    // Número de teléfono. Obligatorio.
    movilpac: {type: String, required: true},

    // Dirección del paciente. Opcional.
    dirpac: {type: String, required: false},

    // Provincia. Obligatoria.
    propac: {type: String, required: true},

    // Municipio. Obligatorio.
    munipac: {type: String, required: true}
},
{
    /*
      collection establece explícitamente el nombre
      de la colección de MongoDB.

      Los documentos se guardarán en "pacientes".
    */
    collection: "pacientes"
}
)

/*
  mongoose.model("Paciente", PacienteSchema)

  Crea el modelo Paciente a partir del esquema.

  Con este modelo podemos realizar operaciones como:
  Paciente.find()
  Paciente.findByIdAndUpdate()
  Paciente.findByIdAndDelete()

  export default permite importarlo desde las rutas.
*/
export default mongoose.model("Paciente", PacienteSchema)
