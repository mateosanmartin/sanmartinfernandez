
/*
  PINIA - STORE DE DOCTORES

  OBJETIVO:
  Compartir los datos del doctor seleccionado
  entre distintos componentes.

  DIFERENCIA CON pacienteStore.js:

  Este store utiliza la sintaxis Setup Store.

  En lugar de definir state y actions,
  utiliza ref() y funciones dentro de defineStore().

  Por eso aquí utilizamos .value para modificar
  las variables reactivas.
*/

// defineStore permite crear el store de Pinia.
import { defineStore } from "pinia";

// ref permite crear variables reactivas.
import { ref } from "vue";

/*
  defineStore("doctor", () => {...})

  "doctor" es el identificador único del store.

  La función contiene las variables y acciones
  que queremos compartir.
*/
export const useDoctorStore = defineStore("doctor", () => {

  /*
    VARIABLES REACTIVAS

    doctorId:
    Identificador _id del doctor seleccionado.

    nomedoc:
    Nombre del doctor.

    apeldoc:
    Apellidos del doctor.

    Inicialmente son cadenas vacías porque
    todavía no hemos seleccionado ningún doctor.
  */
  const doctorId = ref("");
  const nomedoc = ref("");
  const apeldoc = ref("");

  /*
    FUNCIÓN: seleccionarDoctor(doctor)

    OBJETIVO:
    Guardar los datos de un doctor seleccionado.

    PARÁMETRO:
    doctor: objeto que contiene sus datos.

    PASO A PASO:
    1. Recibimos el objeto doctor.
    2. Guardamos su identificador _id.
    3. Guardamos su nombre.
    4. Guardamos sus apellidos.

    IMPORTANTE:
    Como las variables están creadas con ref(),
    utilizamos .value para modificar su contenido.

    EJEMPLO:
    doctorStore.seleccionarDoctor(doctor);
  */

  // Guardar el doctor seleccionado
  function seleccionarDoctor(doctor) {
    doctorId.value = doctor._id;
    nomedoc.value = doctor.nomedoc;
    apeldoc.value = doctor.apeldoc;
  }

  /*
    FUNCIÓN: limpiarDoctor()

    OBJETIVO:
    Borrar la selección del doctor.

    Restablecemos las tres variables reactivas
    a cadenas vacías.

    EJEMPLO:
    doctorStore.limpiarDoctor();

    Esto permite evitar que una cita nueva
    conserve accidentalmente un doctor anterior.
  */

  // Limpiar el doctor seleccionado
  function limpiarDoctor() {
    doctorId.value = "";
    nomedoc.value = "";
    apeldoc.value = "";
  }

  /*
    RETURN DEL STORE

    En un Setup Store debemos devolver
    las variables y funciones que queremos
    utilizar desde otros componentes.

    Si no devolvemos una variable o función,
    no estará disponible públicamente
    a través del store.

    Aquí exponemos:
    - Los datos del doctor.
    - La función para seleccionarlo.
    - La función para limpiar su selección.
  */
  return {
    doctorId,
    nomedoc,
    apeldoc,
    seleccionarDoctor,
    limpiarDoctor,
  };
});
