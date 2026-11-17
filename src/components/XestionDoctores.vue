
<template>
  <div class="xestion-doctores">
    <h4>🩺 Xestión de doctores</h4>

    <form @submit.prevent="guardarDoctor">
      <div class="fila">
        <div class="campo">
          <label for="nome">Nome:</label>
          <input
            id="nome"
            v-model="novoDoctor.nomedoc"
            type="text"
            required
            @blur="corrixirNome"
          />
        </div>

        <div class="campo">
          <label for="apelidos">Apelidos:</label>
          <input
            id="apelidos"
            v-model="novoDoctor.apeldoc"
            type="text"
            required
            @blur="corrixirApelido"
          />
        </div>

        <div class="campo">
          <label for="colexiado">Colexiado:</label>
          <select id="colexiado" v-model="novoDoctor.coledoc" required>
            <option value="">Seleccionar</option>
            <option :value="true">Si</option>
            <option :value="false">Non</option>
          </select>
        </div>
      </div>

      <div class="fila">
        <div class="campo">
          <label for="correo">Correo:</label>
          <input
            id="correo"
            v-model="novoDoctor.maildoc"
            type="email"
            required
          />
        </div>

        <div class="campo">
          <label for="telefono">Teléfono:</label>
          <input
            id="telefono"
            v-model="novoDoctor.movildoc"
            type="tel"
            maxlength="9"
            required
            :class="{
              'input-error':
                telefonoComprobado &&
                novoDoctor.movildoc.trim() !== '' &&
                !telefonoValido,
            }"
            @blur="telefonoComprobado = novoDoctor.movildoc.trim() !== ''"
            @input="telefonoComprobado = false"
          />
        </div>

        <div class="campo">
          <label for="especialidade">Especialidade:</label>
          <select id="especialidade" v-model="novoDoctor.espedoc" required>
            <option value="">Seleccionar</option>
            <option
              v-for="especialidade in especialidades"
              :key="especialidade.id"
              :value="especialidade.nm"
            >
              {{ especialidade.nm }}
            </option>
          </select>
          <button
            type="button"
            class="btn-buscar"
            @click="buscarDoctoresPorEspecialidad"
          >
            🔎
          </button>
        </div>
      </div>

      <div class="contenedor-errores" aria-live="polite">
        <p
          class="mensaje-error"
          :class="{ 'error-oculto': !hayErrorValidacion }"
        >
          {{ mensajeValidacion }}
        </p>
      </div>

      <div class="botones-formulario">
        <button
          type="submit"
          class="btn-guardar"
          :disabled="
            novoDoctor.nomedoc.trim() === '' ||
            novoDoctor.apeldoc.trim() === '' ||
            novoDoctor.maildoc.trim() === '' ||
            !telefonoValido ||
            novoDoctor.coledoc === '' ||
            novoDoctor.espedoc === ''
          "
        >
          {{ editando ? "Actualizar" : "Gardar" }}
        </button>

        <button type="button" class="btn-limpiar" @click="limpiaFormdoc">
          {{ editando ? "Cancelar" : "🧹" }}
        </button>
      </div>
    </form>

    <h4 class="titulo-listado">
      📋 Listaxe de doctores

      <button
        type="button"
        class="btn-pdf"
        @click="exportarDoctores"
        :disabled="doctores.length === 0"
      >
        🖨️
      </button>
    </h4>

    <div class="tabla-contenedor" v-if="doctores.length > 0">
      <table class="tabla-doctores">
        <colgroup>
          <col class="col-numero" />
          <col class="col-apelidos" />
          <col class="col-nome" />
          <col class="col-movil" />
          <col class="col-correo" />
          <col class="col-especialidade" />
          <col class="col-colexiado" />
          <col class="col-accions" />
        </colgroup>

        <thead>
          <tr>
            <th>#</th>
            <th>Apelidos</th>
            <th>Nome</th>
            <th>Móvil</th>
            <th>Correo</th>
            <th>Especialidade</th>
            <th>Colexiado</th>
            <th>Accións</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(u, index) in doctores" :key="u._id || index">
            <td>{{ index + 1 }}</td>
            <td>{{ u.apeldoc }}</td>
            <td>{{ u.nomedoc }}</td>
            <td>{{ u.movildoc }}</td>
            <td>{{ u.maildoc }}</td>
            <td>{{ u.espedoc }}</td>
            <td>{{ u.coledoc ? "Si" : "Non" }}</td>

            <td class="acciones">
              <button type="button" @click="editarDoctor(index)" title="Editar">
                ✏️
              </button>

              <button
                type="button"
                @click="eliminarDoctor(index)"
                title="Eliminar"
              >
                🗑️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else>Non hai doctores cargados.</p>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";

import { obtenerEspecialidades } from "../api/especialidades.js";

import {
  saveDoctor,
  getDoctores,
  getDoctorByEspecialidad,
  modifyDoctor,
  deleteDoctor,
} from "../api/doctores.js";

import {
  alertaExito,
  alertaError,
  alertaConfirmacion,
} from "../utils/alertas.js";

import { generarPDF } from "../utils/pdf.js";
import { useDoctorStore } from "../store/doctorStore.js";

const doctorStore = useDoctorStore();

// LISTAS
const doctores = ref([]);
const especialidades = ref([]);

// CONTROL DE EDICIÓN Y FILTRO
const editando = ref(false);
const idDoctorEditar = ref(null);
const filtroEspecialidad = ref("");
const telefonoComprobado = ref(false);

// FORMULARIO
const novoDoctor = reactive({
  nomedoc: "",
  apeldoc: "",
  maildoc: "",
  movildoc: "",
  coledoc: "",
  espedoc: "",
});

// VALIDAR TELÉFONO
const telefonoValido = computed(() => {
  const telefono = novoDoctor.movildoc.trim();
  return /^[67]\d{8}$/.test(telefono);
});

const mensajeValidacion = computed(() => {
  if (
    telefonoComprobado.value &&
    novoDoctor.movildoc.trim() !== "" &&
    !telefonoValido.value
  ) {
    return "⚠️ O teléfono debe comezar por 6 ou 7 e ter 9 díxitos.";
  }
  return "";
});

const hayErrorValidacion = computed(() => mensajeValidacion.value !== "");

// CARGAR DATOS AL ENTRAR
onMounted(async () => {
  try {
    especialidades.value = await obtenerEspecialidades();
    await cargarDoctores();
  } catch (error) {
    console.error("Error al cargar los datos:", error);
    alertaError("Error al cargar los datos, contacte con el administrador.");
  }
});

// OBTENER TODOS LOS DOCTORES
async function cargarDoctores() {
  try {
    doctores.value = await getDoctores();
  } catch (error) {
    console.error("Error al obtener doctores:", error);
    alertaError("Error al obtener los doctores.");
  }
}

// FILTRAR DOCTORES POR ESPECIALIDAD
async function filtrarDoctores() {
  try {
    if (filtroEspecialidad.value === "") {
      doctores.value = await getDoctores();
    } else {
      doctores.value = await getDoctorByEspecialidad(filtroEspecialidad.value);
    }
  } catch (error) {
    console.error("Error al filtrar doctores:", error);
    alertaError("Error al filtrar os doctores.");
  }
}

async function buscarDoctoresPorEspecialidad() {
  filtroEspecialidad.value = novoDoctor.espedoc;
  await filtrarDoctores();
}

// GUARDAR O ACTUALIZAR DOCTOR
async function guardarDoctor() {
  if (!telefonoValido.value) {
    return;
  }

  try {
    const doctorParaGuardar = {
      nomedoc: novoDoctor.nomedoc.trim(),
      apeldoc: novoDoctor.apeldoc.trim(),
      maildoc: novoDoctor.maildoc.trim(),
      movildoc: novoDoctor.movildoc.trim(),
      coledoc: novoDoctor.coledoc,
      espedoc: novoDoctor.espedoc,
    };

    if (editando.value) {
      const confirmacion = await alertaConfirmacion(
        "¿Estás seguro de que quieres actualizar este doctor?",
      );

      if (!confirmacion.isConfirmed) {
        return;
      }

      await modifyDoctor(idDoctorEditar.value, doctorParaGuardar);
      doctorStore.seleccionarDoctor({ _id: idDoctorEditar.value, ...doctorParaGuardar });

      await alertaExito("El doctor se ha actualizado correctamente.");
    } else {
      await saveDoctor(doctorParaGuardar);

      await alertaExito("El doctor se ha guardado correctamente.");
    }

    limpiaFormdoc();
    await filtrarDoctores();
  } catch (error) {
    console.error("Error al guardar doctor:", error);
    alertaError("Error al guardar doctor, contacte con el Administrador.");
  }
}

// EDITAR DOCTOR
function editarDoctor(index) {
  const doctor = doctores.value[index];

  Object.assign(novoDoctor, {
    nomedoc: doctor.nomedoc,
    apeldoc: doctor.apeldoc,
    maildoc: doctor.maildoc,
    movildoc: doctor.movildoc,
    coledoc: doctor.coledoc,
    espedoc: doctor.espedoc,
  });

  idDoctorEditar.value = doctor._id;
  doctorStore.seleccionarDoctor(doctor);
  editando.value = true;
  telefonoComprobado.value = true;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ELIMINAR DOCTOR
async function eliminarDoctor(index) {
  try {
    const confirmacion = await alertaConfirmacion(
      "¿Estás seguro de eliminar este doctor?",
    );

    if (confirmacion.isConfirmed) {
      const doctor = doctores.value[index];

      await deleteDoctor(doctor._id);

      if (doctorStore.doctorId === doctor._id) {
        doctorStore.limpiarDoctor();
      }

      await alertaExito("Doctor eliminado correctamente.");

      if (idDoctorEditar.value === doctor._id) {
        limpiaFormdoc();
      }

      await filtrarDoctores();
    }
  } catch (error) {
    console.error("Error al eliminar doctor:", error);
    alertaError("Error al eliminar doctor, contacte con el administrador.");
  }
}

// LIMPIAR FORMULARIO
function limpiaFormdoc() {
  Object.assign(novoDoctor, {
    nomedoc: "",
    apeldoc: "",
    maildoc: "",
    movildoc: "",
    coledoc: "",
    espedoc: "",
  });

  editando.value = false;
  idDoctorEditar.value = null;
  telefonoComprobado.value = false;
}

// CORREGIR NOMBRE
function corrixirNome() {
  if (novoDoctor.nomedoc.length > 0) {
    novoDoctor.nomedoc = novoDoctor.nomedoc
      .trim()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
}

// CORREGIR APELLIDOS
function corrixirApelido() {
  if (novoDoctor.apeldoc.length > 0) {
    novoDoctor.apeldoc = novoDoctor.apeldoc
      .trim()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
}

// EXPORTAR DOCTORES A PDF
function exportarDoctores() {
  generarPDF(
    "Listado de doctores",
    [
      "Nº",
      "Apellidos",
      "Nombre",
      "Móvil",
      "Correo",
      "Especialidad",
      "Colegiado",
    ],
    doctores.value.map((doctor, index) => [
      index + 1,
      doctor.apeldoc,
      doctor.nomedoc,
      doctor.movildoc,
      doctor.maildoc,
      doctor.espedoc,
      doctor.coledoc ? "Si" : "Non",
    ]),
    "listado_doctores.pdf",
  );
}
</script>

<style scoped>
.xestion-doctores {
  width: 100%;
  padding: 0.5rem 2rem;
  padding-bottom: 1.25rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  margin-top: 1rem;
}

/* FORMULARIO */
form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-bottom: 0.9rem;
}

.fila {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
  width: 100%;
  align-items: center;
}

.campo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  min-width: 0;
}

.campo label {
  flex: 0 0 auto;
  min-width: 80px;
  color: #333;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
}

.campo input,
.campo select {
  flex: 1;
  min-width: 0;
  width: 100%;
  height: 38px;
  padding: 0.5rem 0.7rem;
  box-sizing: border-box;
  border: 1px solid #000000;
  border-radius: 5px;
  font-size: 0.9rem;
  color: #333;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.campo input:focus,
.campo select:focus {
  border-color: #348358;
  box-shadow: 0 0 0 2px rgba(95, 207, 145, 0.15);
}

.input-error {
  border: 2px solid #e53935 !important;
  background-color: #fff5f5;
}

.contenedor-errores {
  height: 18px;
  min-height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.contenedor-errores .mensaje-error {
  margin: 0;
  line-height: 18px;
  font-size: 0.8rem;
  color: #e53935;
  font-weight: 600;
  text-align: center;
}

.error-oculto {
  visibility: hidden;
}

/* BOTONES DEL FORMULARIO */
.botones-formulario {
  display: flex;
  justify-content: center;
  gap: 5px;
}

.btn-guardar {
  display: block;
  margin: 0;
  margin-top: -7px;
  min-width: 130px;
  padding: 0.55rem 1.8rem;
  background-color: #89fcbd;
  color: #174d32;
  border: 1px solid #5fcf91;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease,
    box-shadow 0.2s ease;
}

.btn-guardar:hover:not(:disabled) {
  background-color: #70e9a9;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.btn-guardar:active:not(:disabled) {
  transform: translateY(1px);
}

.btn-guardar:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-limpiar {
  margin: 0;
  margin-top: -7px;
  border: 1px solid;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease,
    box-shadow 0.2s ease;
}

.btn-limpiar:hover {
  background-color: #c8cac9;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.btn-buscar {
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

.btn-buscar:hover {
  background-color: #c8cac9;
}

.btn-buscar:active {
  transform: scale(0.95);
}

/* TÍTULOS */
h4 {
  margin: 0 0 1.2rem;
  padding: 0.7rem 1rem;
  background-color: #89fcbd;
  color: #174d32;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
}

.titulo-listado {
  position: relative;
  text-align: center;
}

.titulo-listado .btn-pdf {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.btn-pdf {
  margin-right: 10px;
  border: 1px solid;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.btn-pdf:hover {
  background-color: #c8cac9;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* TABLA */
.tabla-contenedor {
  height: 468px;
  overflow: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.tabla-doctores {
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
  margin: 0;
  border: none;
  overflow: visible;
  font-size: 0.85rem;
  background-color: #fff;
}

th,
td {
  padding: 0.7rem 0.6rem;
  border: 1px solid #e1e1e1;
  vertical-align: middle;
}

.tabla-doctores thead th {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #f3f7f5;
  color: #333;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  border: 1.8px solid;
}

td {
  text-align: center;
  color: #444;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ANCHOS DE LAS COLUMNAS */
.tabla-doctores .col-numero {
  width: 5%;
}

.tabla-doctores .col-apelidos {
  width: 15%;
}

.tabla-doctores .col-nome {
  width: 11%;
}

.tabla-doctores .col-movil {
  width: 11%;
}

.tabla-doctores .col-correo {
  width: 23%;
}

.tabla-doctores .col-especialidade {
  width: 15%;
}

.tabla-doctores .col-colexiado {
  width: 9%;
}

.tabla-doctores .col-accions {
  width: 11%;
}

tbody tr:nth-child(even) {
  background-color: #fafafa;
}

tbody tr:hover {
  background-color: #f1fff7;
}

/* BOTONES DE ACCIONES */
td button {
  width: 32px;
  height: 32px;
  margin: 0 2px;
  background: #fff;
  border: 1px solid #d5d9dc;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.1s ease;
}

td button:hover {
  background-color: #f0f0f0;
  border-color: #aaa;
}

td button:active {
  transform: scale(0.95);
}

/* MENSAJE SIN DOCTORES */
.xestion-doctores > p {
  padding: 1rem;
  margin-top: 1rem;
  text-align: center;
  color: #777;
  background-color: #f8f9fa;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
}

/* TABLET */
@media (max-width: 1000px) {
  .fila {
    grid-template-columns: 1fr 1fr;
  }

  .tabla-doctores {
    font-size: 0.78rem;
  }

  th,
  td {
    padding: 0.55rem 0.4rem;
  }
}

/* MÓVIL */
@media (max-width: 768px) {
  .xestion-doctores {
    padding: 1rem;
    border-radius: 5px;
  }

  .fila {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }

  .campo {
    align-items: center;
  }

  .campo label {
    min-width: 105px;
  }

  .campo input,
  .campo select {
    height: 40px;
  }

  .tabla-doctores {
    min-width: 1000px;
  }

  th,
  td {
    padding: 0.6rem;
  }
}
</style>