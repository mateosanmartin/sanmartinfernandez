<template>
  <div class="xestion-pacientes">
    <h4>👥 Xestión de pacientes</h4>

    <form @submit.prevent="guardarPaciente">
      <div class="fila">
        <div class="campo campo-dni">
          <label for="dni">DNI/CIF:</label>
          <input
            id="dni"
            v-model="novoPaciente.dnipac"
            type="text"
            required
            maxlength="9"
            style="text-align: center"
            :class="{
              'dni-valido':
                dniComprobado && novoPaciente.dnipac.trim() !== '' && dniValido,
              'input-error':
                dniComprobado &&
                novoPaciente.dnipac.trim() !== '' &&
                !dniValido,
            }"
            @input="
              novoPaciente.dnipac = novoPaciente.dnipac.toUpperCase();
              dniComprobado = false;
            "
            @blur="dniComprobado = true"
          />
          <button type="button" class="btn-buscar" @click="buscarPaciente">
            🔎
          </button>
        </div>

        <div class="campo campo-nome">
          <label for="nome">Nome:</label>
          <input
            id="nome"
            v-model="novoPaciente.nomepac"
            type="text"
            required
          />
        </div>

        <div class="campo campo-apelidos">
          <label for="apelidos">Apelidos:</label>
          <input
            id="apelidos"
            v-model="novoPaciente.apelpac"
            type="text"
            required
          />
        </div>
      </div>

      <div class="fila">
        <div class="campo campo-fechanacimiento">
          <label for="fechaNacimiento">Fecha Nacimiento:</label>
          <input
            id="fechaNacimiento"
            v-model="novoPaciente.nacipac"
            type="date"
            required
          />
        </div>

        <div class="campo campo-correo">
          <label for="correo">Correo:</label>
          <input
            id="correo"
            v-model="novoPaciente.mailpac"
            type="email"
            required
          />
        </div>

        <div class="campo campo-telefono">
          <label for="telefono">Teléfono:</label>
          <input
            id="telefono"
            v-model="novoPaciente.movilpac"
            type="tel"
            maxlength="9"
            :class="{
              'dni-valido':
                telefonoComprobado &&
                novoPaciente.movilpac.trim() !== '' &&
                telefonoValido,
              'input-error':
                telefonoComprobado &&
                novoPaciente.movilpac.trim() !== '' &&
                !telefonoValido,
            }"
            @input="telefonoComprobado = false"
            @blur="telefonoComprobado = novoPaciente.movilpac.trim() !== ''"
          />
        </div>
      </div>

      <div class="fila">
        <div class="campo campo-direccion">
          <label for="direccion">Dirección:</label>
          <input id="direccion" v-model="novoPaciente.dirpac" type="text" />
        </div>

        <div class="campo campo-provincia">
          <label for="provincia">Provincia:</label>
          <select
            id="provincia"
            v-model="novoPaciente.propac"
            @change="cargarMunicipios"
            required
          >
            <option value="">Seleccionar</option>
            <option
              v-for="provincia in provincias"
              :key="provincia.id"
              :value="provincia.id"
            >
              {{ provincia.nm }}
            </option>
          </select>
        </div>

        <div class="campo campo-municipio">
          <label for="municipio">Municipio:</label>
          <select
            id="municipio"
            v-model="novoPaciente.munipac"
            :disabled="!novoPaciente.propac"
          >
            <option value="">Seleccionar</option>
            <option
              v-for="municipio in municipios"
              :key="municipio.id"
              :value="municipio.id"
            >
              {{ municipio.nm }}
            </option>
          </select>
        </div>
      </div>

      <div class="campo-politica">
        <input
          id="lodpac"
          v-model="novoPaciente.lodpac"
          type="checkbox"
          required
        />
        <label for="lodpac">
          Aceptar la
          <router-link
            class="link-politica"
            to="/politicaprivacidad"
            target="_blank"
            required
            >política de privacidad</router-link
          >
        </label>
      </div>

      <p
        v-if="dniComprobado && novoPaciente.dnipac.trim() !== '' && !dniValido"
        class="mensaje-error"
      >
        ⚠️ O DNI introducido non é válido.
      </p>

      <p
        v-if="
          telefonoComprobado &&
          novoPaciente.movilpac.trim() !== '' &&
          !telefonoValido
        "
        class="mensaje-error"
      >
        ⚠️ O teléfono debe comezar por 6 ou 7 e ter 9 díxitos.
      </p>

      <div class="botones-formulario">
        <button
          type="submit"
          class="btn-guardar"
          :disabled="
            novoPaciente.dnipac === '' ||
            novoPaciente.nomepac === '' ||
            !dniValido ||
            !telefonoValido ||
            novoPaciente.propac === '' ||
            novoPaciente.lodpac === false
          "
        >
          {{ editandoIndex !== null ? "Actualizar" : "Gardar" }}
        </button>
        <button type="button" class="btn-limpiar" @click="limpiarFormulario">
          {{ editandoIndex !== null ? "Cancelar" : "🧹" }}
        </button>
      </div>
    </form>

    <h4 class="titulo-listado">
      📋 Listaxe de pacientes

      <button
        type="button"
        class="btn-pdf"
        @click="exportarPacientes"
        :disabled="pacientes.length === 0"
      >
        🖨️
      </button>
    </h4>

    <div class="tabla-contenedor" v-if="pacientes.length > 0">
      <table class="tabla-pacientes">
        <thead>
          <tr>
            <th>#</th>
            <th>DNI/CIF</th>
            <th>Nome</th>
            <th>Correo</th>
            <th>Provincia</th>
            <th>Accións</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(u, index) in pacientesPaginados" :key="u._id || index">
            <td>
              {{ (paginaActual - 1) * pacientesPorPagina + index + 1 }}
            </td>
            <td class="dni-tabla">{{ u.dnipac }}</td>
            <td>{{ u.nomepac }}</td>
            <td>{{ u.mailpac }}</td>
            <td>{{ u.propac }}</td>

            <td class="acciones">
              <button
                type="button"
                @click="
                  editarPaciente(
                    (paginaActual - 1) * pacientesPorPagina + index,
                  )
                "
                title="Editar"
              >
                ✏️
              </button>

              <button
                type="button"
                @click="
                  eliminarPaciente(
                    (paginaActual - 1) * pacientesPorPagina + index,
                  )
                "
                title="Eliminar"
              >
                🗑️
              </button>
            </td>
          </tr>

          <!-- Filas vacías para mantener siempre la misma altura -->
          <tr
            v-for="n in pacientesPorPagina - pacientesPaginados.length"
            :key="'vacia-' + n"
            class="fila-vacia"
          >
            <td colspan="6">&nbsp;</td>
          </tr>
        </tbody>
      </table>

      <!-- PAGINACIÓN -->
      <div class="paginacion" v-if="totalPaginas > 1">
        <button
          type="button"
          @click="cambiarPagina(paginaActual - 1)"
          :disabled="paginaActual === 1"
        >
          Anterior
        </button>

        <button
          v-for="pagina in totalPaginas"
          :key="pagina"
          type="button"
          @click="cambiarPagina(pagina)"
          :class="{ activa: paginaActual === pagina }"
        >
          {{ pagina }}
        </button>

        <button
          type="button"
          @click="cambiarPagina(paginaActual + 1)"
          :disabled="paginaActual === totalPaginas"
        >
          Siguiente
        </button>
      </div>
    </div>

    <p v-else>Non hai pacientes cargados.</p>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { obtenerProvincias, obtenerMunicipios } from "../api/municipios.js";
import {
  getPacientes,
  savePaciente,
  updatePaciente,
  deletePaciente,
} from "../api/pacientes.js";
import {
  alertaExito,
  alertaError,
  alertaConfirmacion,
} from "../utils/alertas.js";
import { generarPDF } from "../utils/pdf.js";

const pacientes = ref([]);

const provincias = ref([]);
const municipios = ref([]);

// PAGINACIÓN
const pacientesPorPagina = 5;
const paginaActual = ref(1);

const totalPaginas = computed(() =>
  Math.ceil(pacientes.value.length / pacientesPorPagina),
);

const pacientesPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * pacientesPorPagina;

  return pacientes.value.slice(inicio, inicio + pacientesPorPagina);
});

function cambiarPagina(pagina) {
  if (pagina >= 1 && pagina <= totalPaginas.value) {
    paginaActual.value = pagina;
  }
}

const novoPaciente = reactive({
  dnipac: "",
  nomepac: "",
  apelpac: "",
  nacipac: "",
  mailpac: "",
  movilpac: "",
  dirpac: "",
  propac: "",
  munipac: "",
  lodpac: false,
});

// Índice del paciente que estamos editando.
// null significa que estamos creando uno nuevo.

const editandoIndex = ref(null);

const dniComprobado = ref(false);
const telefonoComprobado = ref(false);

onMounted(async () => {
  provincias.value = await obtenerProvincias();
  pacientes.value = await getPacientes();
});

const dniValido = computed(() => {
  const dni = novoPaciente.dnipac.trim().toUpperCase();

  const letras = "TRWAGMYFPDXBNJZSQVHLCKE";

  // DNI: 8 números + letra
  if (/^\d{8}[A-Z]$/.test(dni)) {
    const numero = parseInt(dni.substring(0, 8), 10);
    const letra = dni.charAt(8);

    return letras[numero % 23] === letra;
  }

  // NIE: X/Y/Z + 7 números + letra
  if (/^[XYZ]\d{7}[A-Z]$/.test(dni)) {
    const prefijo = {
      X: "0",
      Y: "1",
      Z: "2",
    };

    const numero = prefijo[dni.charAt(0)] + dni.substring(1, 8);
    const letra = dni.charAt(8);

    return letras[parseInt(numero, 10) % 23] === letra;
  }

  return false;
});

const telefonoValido = computed(() => {
  const telefono = novoPaciente.movilpac.trim();

  // Debe empezar por 6 o 7 y tener exactamente 9 dígitos
  return /^[67]\d{8}$/.test(telefono);
});

async function cargarMunicipios() {
  if (novoPaciente.propac === "") {
    municipios.value = [];
    return;
  }

  municipios.value = await obtenerMunicipios(novoPaciente.propac);
}

async function buscarPaciente() {
  const dni = novoPaciente.dnipac.trim().toUpperCase();

  // Comprobar que el DNI sea válido
  if (!dniValido.value) {
    dniComprobado.value = true;
    return;
  }

  // Buscar paciente por DNI
  const index = pacientes.value.findIndex(
    (paciente) => paciente.dnipac.toUpperCase() === dni,
  );

  // Si no existe
  if (index === -1) {
    alert("No existe ningún paciente con ese DNI.");
    return;
  }

  // Ir a la página donde está el paciente
  paginaActual.value = Math.floor(index / pacientesPorPagina) + 1;

  // Si existe, cargar sus datos
  await editarPaciente(index);
}

// Gardar ou actualizar paciente
async function guardarPaciente() {
  try {
    const provincia = provincias.value.find(
      (p) => p.id === novoPaciente.propac,
    );

    const municipio = municipios.value.find(
      (m) => m.id === novoPaciente.munipac,
    );

    const pacienteParaGuardar = {
      ...novoPaciente,
      propac: provincia.nm,
      munipac: municipio.nm,
    };

    let pacienteGuardado;

    if (editandoIndex.value !== null) {
      const confirmacion = await alertaConfirmacion(
        "¿Estás seguro de que quieres actualizar este paciente?",
      );

      if (!confirmacion.isConfirmed) {
        return;
      }

      // ACTUALIZAR PACIENTE
      const pacienteActual = pacientes.value[editandoIndex.value];

      pacienteGuardado = await updatePaciente(
        pacienteActual._id,
        pacienteParaGuardar,
      );

      pacientes.value[editandoIndex.value] = pacienteGuardado;

      await alertaExito("El paciente se ha actualizado correctamente.");
    } else {
      // CREAR PACIENTE
      pacienteGuardado = await savePaciente(pacienteParaGuardar);

      pacientes.value.push(pacienteGuardado);

      // Ir a la última página si se crea un paciente nuevo
      paginaActual.value = totalPaginas.value;

      await alertaExito("El paciente se ha guardado correctamente.");
    }

    limpiarFormulario();
  } catch (error) {
    console.error("Error ao gardar paciente:", error);
    alertaError("Error al guardar paciente, contacte con el Administrador.");
  }
}

// Limpiar formulario
function limpiarFormulario() {
  Object.assign(novoPaciente, {
    dnipac: "",
    nomepac: "",
    apelpac: "",
    nacipac: "",
    mailpac: "",
    movilpac: "",
    dirpac: "",
    propac: "",
    munipac: "",
    lodpac: false,
  });

  editandoIndex.value = null;
  dniComprobado.value = false;
  telefonoComprobado.value = false;
}

// Eliminar paciente
async function eliminarPaciente(index) {
  try {
    const confirmacion = await alertaConfirmacion(
      "¿Estás seguro de eliminar el paciente?",
    );

    if (confirmacion.isConfirmed) {
      const paciente = pacientes.value[index];

      await deletePaciente(paciente._id);

      pacientes.value.splice(index, 1);

      // Comprobar que la página actual siga existiendo
      if (paginaActual.value > totalPaginas.value && totalPaginas.value > 0) {
        paginaActual.value = totalPaginas.value;
      }

      alertaExito("Paciente eliminado correctamente.");

      if (editandoIndex.value === index) {
        limpiarFormulario();
      }
    } else {
      return;
    }
  } catch (error) {
    console.error("Error al eliminar paciente:", error);
    alertaError("Error al eliminar paciente, contacte con el administrador.");
  }
}

// Editar paciente
async function editarPaciente(index) {
  const paciente = pacientes.value[index];

  Object.assign(novoPaciente, paciente);

  const provincia = provincias.value.find((p) => p.nm === paciente.propac);

  if (provincia) {
    novoPaciente.propac = provincia.id;

    municipios.value = await obtenerMunicipios(provincia.id);

    const municipio = municipios.value.find((m) => m.nm === paciente.munipac);

    if (municipio) {
      novoPaciente.munipac = municipio.id;
    }
  }

  novoPaciente.lodpac = true;

  editandoIndex.value = index;
  dniComprobado.value = true;
  telefonoComprobado.value = true;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// EXPORTAR PACIENTES A PDF
function exportarPacientes() {
  generarPDF(
    "Listado de pacientes",
    ["Nº", "DNI/CIF", "Nombre", "Correo", "Provincia"],
    pacientes.value.map((paciente, index) => [
      index + 1,
      paciente.dnipac,
      paciente.nomepac,
      paciente.mailpac,
      paciente.propac,
    ]),
    "listado_pacientes.pdf",
  );
}
</script>

<style scoped>
.xestion-pacientes {
  width: 100%;
  padding: 0.5rem 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  margin-top: 1rem;
}

/* =========================
   FORMULARIO
   ========================= */

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 0.9rem;
}

.fila {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
  width: 100%;
  align-items: center;
}

/* =========================
   CAMPOS
   ========================= */

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

.input-container {
  flex: 1;
  min-width: 0;
}

.input-container input {
  width: 100%;
}

.input-error {
  border: 2px solid #e53935 !important;
  background-color: #fff5f5;
}

.mensaje-error {
  display: block;
  margin-top: 0.3rem;
  color: #e53935;
  font-size: 0.8rem;
  font-weight: 600;
}

/* Anchos específicos */
.campo-dni {
  width: 100%;
}

.campo-nome {
  width: 100%;
}

.campo-apelidos {
  width: 100%;
}

.campo-fechaNacimiento {
  width: 100%;
}

.campo-correo {
  width: 100%;
}

.campo-movil {
  width: 100%;
}

.campo-direccion {
  width: 100%;
}

.campo-politica {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
}

.campo-politica input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.campo-politica label {
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
}

.link-politica {
  color: rgb(74, 189, 93);
}

.link-politica:hover {
  color: rgb(1, 129, 59);
}

.tabla-contenedor {
  margin-bottom: 0;
}

/* =========================
   BOTÓN
   ========================= */

.btn-guardar {
  display: block;
  margin: 0.5rem 0 0;

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
  margin: 0.5rem 0 0;

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

.botones-formulario {
  display: flex;
  justify-content: center;
  gap: 5px;
}

/* =========================
   TÍTULOS
   ========================= */

h4 {
  margin: 0 0 1.2rem;
  padding: 0.7rem 1rem;

  background-color: #89fcbd;
  color: #174d32;

  border-radius: 5px;

  font-size: 1rem;
  font-weight: 600;
}

/* =========================
   TABLA
   ========================= */

table {
  width: 100%;
  margin-top: 0.3rem;

  border-collapse: collapse;

  font-size: 0.85rem;
  background-color: #fff;

  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}

th,
td {
  padding: 0.7rem 0.6rem;
  border: 1px solid #e1e1e1;
  vertical-align: middle;
}

th {
  background-color: #f3f7f5;
  color: #333;

  text-align: center;
  font-weight: 600;
  white-space: nowrap;
}

td {
  text-align: center;
  color: #444;
}

tbody tr:nth-child(even) {
  background-color: #fafafa;
}

tbody tr:hover {
  background-color: #f1fff7;
}

/* =========================
   BOTONES DE ACCIONES
   ========================= */

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

/* =========================
   OTROS ELEMENTOS
   ========================= */

.button {
  border: 2px solid #ddd;
  cursor: pointer;
  font-size: 1rem;
}

.inline-control {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding-right: 5rem;
}

/* =========================
   MENSAJE SIN PACIENTES
   ========================= */

.xestion-pacientes > p {
  padding: 1rem;
  margin-top: 1rem;

  text-align: center;
  color: #777;

  background-color: #f8f9fa;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
}

/* =========================
   TABLET
   ========================= */

@media (max-width: 1000px) {
  .fila {
    grid-template-columns: 1fr 1fr;
  }

  .fila:last-of-type {
    grid-template-columns: 1fr;
  }

  table {
    font-size: 0.78rem;
  }

  th,
  td {
    padding: 0.55rem 0.4rem;
  }
}

/* =========================
   MÓVIL
   ========================= */

@media (max-width: 768px) {
  .xestion-pacientes {
    padding: 1rem;
    border-radius: 5px;
  }

  .fila,
  .fila:last-of-type {
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

  /* Permite desplazar la tabla horizontalmente */
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  th,
  td {
    padding: 0.6rem;
  }
}

/* TÍTULO Y BOTÓN PDF */

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

/* =========================
   PAGINACIÓN
   ========================= */

.paginacion {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 15px;
  margin-bottom: 10px;
}

.paginacion button {
  min-width: 34px;
  height: 32px;
  padding: 0 10px;

  background-color: #ffffff;
  color: #174d32;

  border: 1px solid #5fcf91;
  border-radius: 5px;

  font-size: 0.85rem;
  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease;
}

.paginacion button:hover:not(:disabled) {
  background-color: #e5ffef;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
}

.paginacion button.activa {
  background-color: #89fcbd;
  color: #174d32;
  border-color: #5fcf91;
}

.paginacion button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Filas vacías: conservan el tamaño de la tabla */
.fila-vacia td {
  height: 46px;
  padding: 0.7rem 0.6rem;
  background-color: #ffffff;
}

.fila-vacia:hover {
  background-color: #ffffff;
}

</style>
