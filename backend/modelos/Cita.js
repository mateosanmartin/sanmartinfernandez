

// Importamos Mongoose para crear el esquema de citas.
import mongoose from "mongoose";

/*
  ESQUEMA DE CITA

  Una cita contiene:
  - DNI del paciente.
  - Referencia al doctor.
  - Fecha y hora.
  - Motivo.
  - Estado.
  - Diagnóstico y tratamiento.
  - Precio de la consulta.

  IMPORTANTE:
  doctorId utiliza ObjectId y ref: "Doctor".

  Esto permite relacionar una cita con un
  documento de la colección de doctores.
*/
const CitaSchema = new mongoose.Schema(
    {
        /*
          DNI DEL PACIENTE

          Se almacena como texto.

          Este campo no utiliza una referencia
          ObjectId a Paciente: guarda directamente
          el DNI del paciente.
        */
        pacienteDNI: {
            type: String,
            required: true
        },

        /*
          REFERENCIA AL DOCTOR

          mongoose.Schema.Types.ObjectId:
          Tipo especial de MongoDB para identificadores.

          ref: "Doctor":
          Indica que este identificador corresponde
          a un documento del modelo Doctor.

          required: true:
          La cita debe contener un identificador
          de doctor.

          Esta referencia permite utilizar populate()
          para recuperar datos del doctor.
        */
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true
        },

        // Fecha de la cita almacenada como texto.
        fecha: { type: String, required: true },

        // Hora de la cita almacenada como texto.
        hora: { type: String, required: true },

        // Motivo de la consulta. Obligatorio.
        motivo: { type: String, required: true },

        diagnostico: {
            type: String,
            default: ""
        },

        tratamento: {
            type: String,
            default: ""
        },
        tarifa: {
            type: Number,
            default: 0
        },

        /*
          ESTADO DE LA CITA

          Si no se proporciona un estado,
          Mongoose utilizará "pendente".
        */
        estado: {
            type: String,
            default: "pendente"
        }
    },
    {
        // Colección de MongoDB donde se guardan las citas.
        collection: "citas"
    }
);

/*
  Creamos y exportamos el modelo Cita.

  Gracias a este modelo podemos:
  - Crear citas con new Cita().
  - Consultarlas con Cita.find().
  - Actualizarlas con findByIdAndUpdate().
  - Eliminarlas con findByIdAndDelete().
*/
export default mongoose.model("Cita", CitaSchema);
