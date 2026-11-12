
import { defineStore } from "pinia";

export const usePacienteStore = defineStore("paciente", {
  state: () => ({
    pacienteId: null,
    dnipac: null,
    nomepac: null,
    apelpac: null,
  }),

  actions: {
    seleccionarPaciente(paciente) {
      this.pacienteId = paciente._id;
      this.dnipac = paciente.dnipac;
      this.nomepac = paciente.nomepac;
      this.apelpac = paciente.apelpac;
    },

    limpiarPaciente() {
      this.pacienteId = null;
      this.dnipac = null;
      this.nomepac = null;
      this.apelpac = null;
    },
  },
});
