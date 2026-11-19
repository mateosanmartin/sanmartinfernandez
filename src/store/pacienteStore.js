
/*
  PINIA - STORE DE PACIENTES

  OBJETIVO:
  Guardar los datos del paciente seleccionado para
  que puedan utilizarse desde diferentes componentes.

  EJEMPLO:
  Seleccionamos un paciente en XestionPacientes.vue
  y después utilizamos su DNI en XestionCitas.vue.

  Sin Pinia tendríamos que pasar los datos
  entre componentes mediante props o eventos.
*/

// defineStore permite crear un almacén de estado global.
import { defineStore } from "pinia";

/*
  defineStore("paciente", {...})

  "paciente":
  Es el identificador único de este store.

  state:
  Define las variables que queremos compartir.

  actions:
  Define las funciones que pueden modificar esas variables.
*/
export const usePacienteStore = defineStore("paciente", {

  /*
    STATE: ESTADO INICIAL

    state es una función que devuelve un objeto.

    pacienteId:
    Identificador _id de MongoDB.

    dnipac:
    DNI del paciente seleccionado.

    nomepac:
    Nombre del paciente.

    apelpac:
    Apellidos del paciente.

    Inicialmente todas las propiedades son null,
    porque todavía no hemos seleccionado ninguno.
  */
  state: () => ({
    pacienteId: null,
    dnipac: null,
    nomepac: null,
    apelpac: null,
  }),

  /*
    ACTIONS

    Contiene las funciones que modifican el estado.

    Dentro de estas funciones utilizamos this
    para acceder a las propiedades del store.
  */
  actions: {

    /*
      FUNCIÓN: seleccionarPaciente(paciente)

      OBJETIVO:
      Guardar los datos de un paciente en Pinia.

      PARÁMETRO:
      paciente: objeto con los datos del paciente.

      PASO A PASO:
      1. Recibimos un objeto paciente.
      2. Guardamos su _id en pacienteId.
      3. Guardamos su DNI en dnipac.
      4. Guardamos su nombre en nomepac.
      5. Guardamos sus apellidos en apelpac.

      this hace referencia al propio store.

      EJEMPLO:
      pacienteStore.seleccionarPaciente(paciente);

      IMPORTANTE:
      En este tipo de store no necesitamos .value
      para acceder a las propiedades del estado.
    */
    seleccionarPaciente(paciente) {
      this.pacienteId = paciente._id;
      this.dnipac = paciente.dnipac;
      this.nomepac = paciente.nomepac;
      this.apelpac = paciente.apelpac;
    },

    /*
      FUNCIÓN: limpiarPaciente()

      OBJETIVO:
      Eliminar los datos del paciente seleccionado.

      Restablecemos todas las propiedades a null.

      EJEMPLO:
      pacienteStore.limpiarPaciente();

      Esto resulta útil cuando queremos cambiar
      de paciente o limpiar una selección anterior.
    */
    limpiarPaciente() {
      this.pacienteId = null;
      this.dnipac = null;
      this.nomepac = null;
      this.apelpac = null;
    },
  },
});
