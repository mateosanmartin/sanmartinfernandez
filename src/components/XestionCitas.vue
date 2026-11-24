<template>
  <div class="xestion-citas">
    <h4>📅 Xestión de Citas</h4>
    <form @submit.prevent="guardarCita">
      <div class="fila fila-principal">
        <div class="campo">
          <label>ID Cita:</label>
          <input
            v-model="idCitaEditar"
            type="text"
            placeholder="ID cita"
            readonly
          />
        </div>

        <div class="campo">
          <label>Paciente:</label>
          <input
            :value="pacienteDNIEfectivo"
            type="text"
            placeholder="DNI paciente"
            readonly
          />
        </div>

        <div class="campo">
          <label>Doctor:</label>
          <input
            :value="nombreDoctorMostrado"
            type="text"
            placeholder="Doctor seleccionado"
            readonly
          />
        </div>

        <div class="campo">
          <label>ID Doctor:</label>
          <input
            :value="doctorIdEfectivo"
            type="text"
            placeholder="ID Doctor"
            readonly
          />
        </div>
        <button
          type="button"
          class="btn-limpiar"
          @click="limpiarTodo"
          title="Limpiar"
        >
          🧹
        </button>
      </div>

      <div class="fila fila-secundaria">
        <div class="campo">
          <label>Fecha:</label>

          <input v-model="novaCita.fecha" type="date" required />
        </div>

        <div class="campo">
          <label>Hora:</label>

          <input v-model="novaCita.hora" type="time" required />
        </div>

        <div class="campo">
          <input
            v-model="novaCita.motivo"
            type="text"
            placeholder="Motivo da cita"
            required
          />
        </div>

        <div class="campo">
          <label for="Estado">Estado: </label>

          <select v-model="novaCita.estado">
            <option value="pendente">Pendente</option>
            <option value="confirmada">Confirmada</option>
            <option value="realizada">Realizada</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
        <div class="campo">
          <label>Tarifa:</label>
          <input
            class="inputTarifa"
            v-model.number="novaCita.tarifa"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            required
            aria-label="Tarifa da consulta"
          />
        </div>
      </div>
      <div class="fila fila-textareas">
        <textarea
          v-model="novaCita.diagnostico"
          placeholder="Diagnóstico"
          aria-label="Diagnóstico"
          rows="3"
        ></textarea>

        <textarea
          v-model="novaCita.tratamento"
          placeholder="Tratamento"
          aria-label="Tratamento"
          rows="3"
        ></textarea>
      </div>

      <div class="botones-formulario">
        <button type="submit" class="btn-guardar" :disabled="!formularioValido">
          {{ editando ? "Actualizar" : "Gardar" }}
        </button>

        <button
          type="button"
          class="btn-imprimir"
          :disabled="!editando && !novaCita.fecha"
          title="Imprimir cita seleccionada"
          @click="imprimirCitaSeleccionada"
        >
          🖨️ Imprimir Cita
        </button>
      </div>
    </form>

    <h4 class="titulo-listado">
      📋 Listaxe de Citas
      <span class="paciente-listado">
        {{
          listarTodas
            ? "(Todas)"
            : `${pacienteStore.nomepac || ""} ${pacienteStore.apelpac || ""}`
        }}
      </span>
      <span class="controles-listado">
        <label class="listar-todas" for="listarTodas">
          Listar Todas
          <input id="listarTodas" v-model="listarTodas" type="checkbox" />
        </label>
      </span>
    </h4>
    <div v-if="citas.length > 0" class="tabla-contenedor">
      <table>
        <thead>
          <tr>
            <th>Paciente (DNI)</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Doctor</th>
            <th>Motivo</th>
            <th>Tarifa</th>
            <th>Estado</th>
            <th>Accións</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="cita in citas" :key="cita._id">
            <td>{{ cita.pacienteDNI }}</td>

            <td>{{ cita.fecha }}</td>

            <td>{{ cita.hora }}</td>

            <td>
              {{ cita.doctorId?.nomedoc }}
              {{ cita.doctorId?.apeldoc }}
            </td>

            <td>{{ cita.motivo }}</td>

            <td>{{ Number(cita.tarifa || 0).toFixed(2) }} €</td>

            <td>{{ cita.estado }}</td>

            <td class="acciones">
              <button type="button" @click="editarCita(cita)">✏️</button>

              <button type="button" @click="eliminarCita(cita)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else class="mensaje">
      Non hai citas cargadas ou falla a conexión coa BBDD.
    </p>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";

import { usePacienteStore } from "../store/pacienteStore.js";
import { useDoctorStore } from "../store/doctorStore.js";

import { getCitas, saveCita, updateCita, deleteCita } from "../api/citas.js";

import {
  alertaExito,
  alertaError,
  alertaConfirmacion,
} from "../utils/alertas.js";

// Función reutilizable que genera y descarga el PDF.
import { generarPDF } from "../utils/pdf.js";

const pacienteStore = usePacienteStore();
const doctorStore = useDoctorStore();

const citas = ref([]);

const editando = ref(false);
const idCitaEditar = ref("");

const listarTodas = ref(false);

const novaCita = reactive({
  pacienteDNI: "",
  doctorId: doctorStore.doctorId,
  fecha: "",
  hora: "",
  motivo: "",
  estado: "pendente",
  diagnostico: "",
  tratamento: "",
  tarifa: 0,
});

const doctorIdEfectivo = computed(() =>
  editando.value ? novaCita.doctorId : doctorStore.doctorId,
);

const pacienteDNIEfectivo = computed(() =>
  editando.value ? novaCita.pacienteDNI : pacienteStore.dnipac || "",
);

const nombreDoctorMostrado = computed(() => {
  if (editando.value && nombreDoctorCita.value) return nombreDoctorCita.value;
  return `${doctorStore.nomedoc} ${doctorStore.apeldoc}`.trim();
});

const nombreDoctorCita = ref("");

const formularioValido = computed(() => {
  return Boolean(
    pacienteDNIEfectivo.value &&
    doctorIdEfectivo.value !== "" &&
    novaCita.fecha !== "" &&
    novaCita.hora !== "" &&
    novaCita.motivo.trim() !== "" &&
    novaCita.tarifa !== "" &&
    novaCita.tarifa >= 0,
  );
});

watch(
  () => pacienteStore.dnipac,
  async () => {
    limpiarFormulario();
    await cargarCitas();
  },
  { immediate: true },
);

watch(
  () => doctorStore.doctorId,
  () => limpiarFormulario(),
);

watch(listarTodas, () => cargarCitas());

async function cargarCitas() {
  try {
    if (listarTodas.value) {
      citas.value = await getCitas();
      return;
    }

    if (!pacienteStore.dnipac) {
      citas.value = [];
      return;
    }

    const todasLasCitas = await getCitas(pacienteStore.dnipac);

    citas.value = todasLasCitas.filter(
      (cita) => cita.pacienteDNI === pacienteStore.dnipac,
    );
  } catch (error) {
    console.error("Error ao cargar citas:", error);
    citas.value = [];
    alertaError("Error ao cargar as citas.");
  }
}

async function guardarCita() {
  if (!formularioValido.value) {
    return;
  }

  const datosCita = {
    pacienteDNI: pacienteDNIEfectivo.value,
    doctorId: doctorIdEfectivo.value,
    fecha: novaCita.fecha,
    hora: novaCita.hora,
    motivo: novaCita.motivo,
    estado: novaCita.estado,
    diagnostico: novaCita.diagnostico,
    tratamento: novaCita.tratamento,
    tarifa: Number(novaCita.tarifa) || 0,
  };

  try {
    if (editando.value) {
      const confirmacion = await alertaConfirmacion(
        "¿Estás seguro de actualizar esta cita?",
      );

      if (!confirmacion.isConfirmed) {
        return;
      }

      await updateCita(idCitaEditar.value, datosCita);
      await alertaExito("Cita actualizada correctamente.");
    } else {
      await saveCita(datosCita);
      await alertaExito("Cita gardada correctamente.");
    }

    limpiarFormulario();
    await cargarCitas();
  } catch (error) {
    console.error("Error ao gardar cita:", error);
    alertaError("Error ao gardar a cita.");
  }
}

function editarCita(cita) {
  const idDoctorCita = cita.doctorId?._id || cita.doctorId;
  if (!idDoctorCita) {
    alertaError("Esta cita non ten un doctor válido asociado.");
    return;
  }
  idCitaEditar.value = cita._id;
  novaCita.pacienteDNI = cita.pacienteDNI;
  novaCita.doctorId = idDoctorCita;
  nombreDoctorCita.value =
    typeof cita.doctorId === "object"
      ? `${cita.doctorId.nomedoc || ""} ${cita.doctorId.apeldoc || ""}`.trim()
      : "Doctor da cita";
  novaCita.fecha = cita.fecha;
  novaCita.hora = cita.hora;
  novaCita.motivo = cita.motivo;
  novaCita.estado = cita.estado;
  novaCita.diagnostico = cita.diagnostico || "";
  novaCita.tratamento = cita.tratamento || "";
  novaCita.tarifa = cita.tarifa ?? 0;

  editando.value = true;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
async function eliminarCita(cita) {
  const confirmacion = await alertaConfirmacion(
    "¿Estás seguro de eliminar esta cita?",
  );

  if (!confirmacion.isConfirmed) {
    return;
  }

  try {
    await deleteCita(cita._id);

    if (idCitaEditar.value === cita._id) {
      limpiarFormulario();
    }

    await cargarCitas();
    await alertaExito("Cita eliminada correctamente.");
  } catch (error) {
    console.error("Error ao eliminar cita:", error);
    alertaError("Error ao eliminar a cita.");
  }
}

function limpiarFormulario() {
  Object.assign(novaCita, {
    pacienteDNI: "",
    doctorId: doctorStore.doctorId,
    fecha: "",
    hora: "",
    motivo: "",
    estado: "pendente",
    diagnostico: "",
    tratamento: "",
    tarifa: 0,
  });

  idCitaEditar.value = "";
  editando.value = false;
}
function imprimirCitaSeleccionada() {
  const citaActual = citas.value.find((c) => c._id === idCitaEditar.value);

  const cabeceras = [
    "Cita",
    "Paciente",
    "Médico",
    "Especialidade",
    "Data",
    "Hora",
    "Tarifa",
  ];

  const filas = [
    [
      citaActual._id,
      pacienteStore.apelpac,
      citaActual?.doctorId.apeldoc,
      citaActual?.doctorId?.espedoc || "Xeral",
      novaCita.fecha,
      novaCita.hora,
      `${Number(novaCita.tarifa || 0).toFixed(2)} €`,
    ],
  ];

  generarPDF(
    "Detalle da Cita Médica",
    cabeceras,
    filas,
    `cita_${pacienteDNIEfectivo.value || "detalles"}.pdf`,
  );
}

function limpiarTodo() {
  limpiarFormulario();
  pacienteStore.limpiarPaciente();
  doctorStore.limpiarDoctor();
}
</script>

<style scoped>
.xestion-citas {
  width: 100%;
  padding: 0.5rem 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  margin-top: 1rem;
  margin-bottom: 50px;
}

h4 {
  margin: 0 0 1.2rem;
  padding: 0.7rem 1rem;
  background-color: #89fcbd;
  color: #174d32;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.fila {
  display: grid;
  gap: 1rem;
  align-items: center;
}

.fila-principal {
  grid-template-columns: 1fr 1fr 1.5fr 1.5fr auto;
}

.fila-secundaria {
  grid-template-columns: 1.1fr 0.8fr 2fr 0.9fr 1fr;
}

.fila-textareas {
  grid-template-columns: 1fr 1fr;
}

.campo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.campo label {
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  color: #333;
}

.campo input,
.campo select,
textarea {
  width: 100%;
  min-width: 0;
  height: 38px;
  padding: 0.5rem;
  border: 1px solid #aaa;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 0.85rem;
  background-color: white;
}

.campo input[readonly] {
  background-color: #f3f7f5;
}

textarea {
  height: 80px;
  resize: vertical;
}

.botones-formulario {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
}

.btn-imprimir {
  padding: 0.55rem 1.2rem;
  background-color: #eaf2ff;
  color: #1d4ed8;
  border: 1px solid #3b82f6;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-imprimir:hover:not(:disabled) {
  background-color: #d6e6ff;
}

.btn-imprimir:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-guardar {
  min-width: 130px;
  padding: 0.55rem 1.8rem;
  background-color: #89fcbd;
  color: #174d32;
  border: 1px solid #5fcf91;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-guardar:hover:not(:disabled) {
  background-color: #70e9a9;
}

.btn-guardar:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-limpiar {
  width: 38px;
  height: 38px;
  padding: 0;
  border: 1px solid #000000;
  border-radius: 5px;

  cursor: pointer;
  font-size: 1rem;

  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
}
.btn-actualizar {
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid #000000;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
}

.btn-limpiar:hover {
  background-color: #c8cac9;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.btn-actualizar:hover {
  background-color: #c8cac9;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.titulo-listado {
  position: relative;
}

.controles-listado {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.listar-todas {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
}

.listar-todas input {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.paciente-listado {
  color: #c0392b;
  margin-left: 0.4rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 0.85rem;
}

th,
td {
  padding: 0.7rem 0.6rem;
  border: 1px solid #e1e1e1;
  text-align: center;
  overflow-wrap: anywhere;
}

th {
  background-color: #f3f7f5;
  color: #333;
}

tbody tr:nth-child(even) {
  background-color: #fafafa;
}

.acciones button {
  margin: 0 2px;
  padding: 0.4rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.mensaje {
  padding: 1rem;
  text-align: center;
  color: #777;
}

@media (max-width: 1100px) {
  .fila-principal,
  .fila-secundaria,
  .fila-textareas {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .xestion-citas {
    padding: 1rem;
  }

  .fila-principal,
  .fila-secundaria,
  .fila-textareas {
    grid-template-columns: 1fr;
  }

  .tabla-contenedor {
    overflow-x: auto;
  }

  table {
    min-width: 650px;
  }
}

</style>