import { defineStore } from "pinia";
import { ref } from "vue";

export const useDoctorStore = defineStore("doctor", () => {
  const doctorId = ref("");
  const nomedoc = ref("");
  const apeldoc = ref("");

  // Guardar el doctor seleccionado
  function seleccionarDoctor(doctor) {
    doctorId.value = doctor._id;
    nomedoc.value = doctor.nomedoc;
    apeldoc.value = doctor.apeldoc;
  }

  // Limpiar el doctor seleccionado
  function limpiarDoctor() {
    doctorId.value = "";
    nomedoc.value = "";
    apeldoc.value = "";
  }

  return {
    doctorId,
    nomedoc,
    apeldoc,
    seleccionarDoctor,
    limpiarDoctor,
  };
});