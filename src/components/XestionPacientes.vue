<template>
  <div class="xestion-pacientes">
    <h4>👥 Xestión de pacientes</h4>

    <form @submit.prevent="gardarPaciente">
      <div class="fila">
        <div class="campo campo-dni">
          <label for="dni">DNI/CIF:</label>
          <input
            id="dni"
            v-model="novoPaciente.dni"
            type="text"
            required
            maxlength="9"
            style="text-align: center"
            :class="{
              'dni-valido': dniComprobado && dniValido,
              'dni-invalido': dniComprobado && !dniValido,
            }"
            @input="
              novoPaciente.dni = novoPaciente.dni.toUpperCase();
              dniComprobado = true;
            "
          />
        </div>

        <div class="campo campo-nome">
          <label for="nome">Nome:</label>
          <input id="nome" v-model="novoPaciente.nome" type="text" required />
        </div>

        <div class="campo campo-apelidos">
          <label for="apelidos">Apelidos:</label>
          <input
            id="apelidos"
            v-model="novoPaciente.apelidos"
            type="text"
            required
          />
        </div>
      </div>

      <div class="fila">
        <div class="campo campo-fechanacimiento">
          <label for="fechaNacimiento">Nacimiento:</label>
          <input
            id="fechaNacimiento"
            v-model="novoPaciente.fechaNacimiento"
            type="date"
            required
          />
        </div>

        <div class="campo campo-correo">
          <label for="correo">Correo:</label>
          <input
            id="correo"
            v-model="novoPaciente.correo"
            type="email"
            required
          />
        </div>

        <div class="campo campo-telefono">
          <label for="telefono">Telefono:</label>
          <input
            id="telefono"
            v-model="novoPaciente.telefono"
            type="tel"
            maxlength="9"
          />
        </div>
      </div>

      <div class="fila">
        <div class="campo campo-direccion">
          <label for="direccion">Dirección:</label>
          <input id="direccion" v-model="novoPaciente.direccion" type="text" />
        </div>

        <div class="campo campo-provincia">
          <label for="provincia">Provincia:</label>
          <select
            id="provincia"
            v-model="novoPaciente.provincia"
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
            v-model="novoPaciente.municipio"
            :disabled="!novoPaciente.provincia"
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

      <p v-if="dniComprobado && !dniValido" class="mensaje-dni">
        ⚠️ O DNI introducido non é válido.
      </p>

      <p
        v-if="novoPaciente.telefono !== '' && !telefonoValido"
        class="mensaje-telefono"
      >
        ⚠️ O teléfono debe comezar por 6 ou 7 e ter 9 díxitos.
      </p>

      <button
        type="submit"
        class="btn-guardar"
        :disabled="
          novoPaciente.dni === '' ||
          novoPaciente.nome === '' ||
          !dniValido ||
          !telefonoValido ||
          novoPaciente.provincia === ''
        "
      >
        {{ editandoIndex !== null ? "Actualizar" : "Gardar" }}
      </button>
    </form>

    <h4>📋 Listaxe de pacientes</h4>

    <div class="tabla-contenedor" v-if="pacientes.length > 0">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>DNI/CIF</th>
            <th>Nome</th>
            <th>Apelidos</th>
            <th>Fecha Nacimiento</th>
            <th>Correo</th>
            <th>Telefono</th>
            <th>Accións</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(u, index) in pacientes" :key="index">
            <td>{{ index + 1 }}</td>
            <td class="dni-tabla">{{ u.dni }}</td>
            <td>{{ u.nome }}</td>
            <td>{{ u.apelidos }}</td>
            <td>{{ u.fechaNacimiento }}</td>
            <td>{{ u.correo }}</td>
            <td>{{ u.telefono }}</td>

            <td class="acciones">
              <button
                type="button"
                @click="editarPaciente(index)"
                title="Editar"
              >
                ✏️
              </button>

              <button
                type="button"
                @click="eliminarPaciente(index)"
                title="Eliminar"
              >
                🗑️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else>Non hai pacientes cargados.</p>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { obtenerProvincias } from "../api/municipios.js";
import { obtenerMunicipios } from "../api/municipios.js";

const pacientes = ref([]);

const provincias = ref([]);
const municipios = ref([]);

const novoPaciente = reactive({
  dni: "",
  nome: "",
  apelidos: "",
  fechaNacimiento: "",
  correo: "",
  provincia: "",
  municipio: "",
  telefono: "",
  direccion: "",
  activo: false,
  tipoCuenta: "",
});

// Índice del paciente que estamos editando.
// null significa que estamos creando uno nuevo.
const editandoIndex = ref(null);

const dniComprobado = ref(false);

const dniValido = computed(() => {
  const dni = novoPaciente.dni.trim().toUpperCase();

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
  const telefono = novoPaciente.telefono.trim();

  // Debe empezar por 6 o 7 y tener exactamente 9 dígitos
  return /^[67]\d{8}$/.test(telefono);
});

// Pacientes de ejemplo
onMounted(async () => {
  pacientes.value = [
    {
      dni: "12345678Z",
      nome: "María",
      apelidos: "Pérez García",
      fechaNacimiento: "1985-03-15",
      correo: "maria.perez@email.com",
      provincia: "A Coruña",
      municipio: "",
      telefono: "600123456",
      direccion: "Rúa Real, 15",
      activo: true,
      tipoCuenta: "particular",
    },
    {
      dni: "X1234567L",
      nome: "Xosé",
      apelidos: "López Fernández",
      fechaNacimiento: "1990-07-22",
      correo: "xose.lopez@email.com",
      provincia: "Lugo",
      municipio: "",
      telefono: "611234567",
      direccion: "Rúa Maior, 24",
      activo: true,
      tipoCuenta: "particular",
    },
    {
      dni: "87654321X",
      nome: "Ana",
      apelidos: "Rodríguez Castro",
      fechaNacimiento: "1978-11-08",
      correo: "ana.rodriguez@email.com",
      provincia: "Ourense",
      municipio: "",
      telefono: "622345678",
      direccion: "Avenida Galicia, 8",
      activo: false,
      tipoCuenta: "particular",
    },
    {
      dni: "Y1234567X",
      nome: "Laura",
      apelidos: "Gómez Martínez",
      fechaNacimiento: "1995-05-30",
      correo: "laura.gomez@email.com",
      provincia: "Pontevedra",
      municipio: "",
      telefono: "633456789",
      direccion: "Rúa do Príncipe, 12",
      activo: true,
      tipoCuenta: "particular",
    },
  ];

  provincias.value = await obtenerProvincias();
});

async function cargarMunicipios() {
  if (novoPaciente.provincia === "") {
    municipios.value = [];
    return;
  }

  municipios.value = await obtenerMunicipios(novoPaciente.provincia);
}

// Gardar ou actualizar paciente
function gardarPaciente() {
  if (!dniValido.value) {
    dniComprobado.value = true;
    return;
  }

  if (editandoIndex.value === null) {
    // Crear paciente nuevo
    pacientes.value.push({
      ...novoPaciente,
    });
  } else {
    // Actualizar paciente existente
    pacientes.value[editandoIndex.value] = {
      ...novoPaciente,
    };
  }

  limpiarFormulario();
}

// Limpiar formulario
function limpiarFormulario() {
  Object.assign(novoPaciente, {
    dni: "",
    nome: "",
    apelidos: "",
    fechaNacimiento: "",
    correo: "",
    provincia: "",
    municipio: "",
    telefono: "",
    direccion: "",
    activo: false,
    tipoCuenta: "",
  });

  editandoIndex.value = null;
  dniComprobado.value = false;
}

// Eliminar paciente
function eliminarPaciente(index) {
  pacientes.value.splice(index, 1);

  // Si estábamos editando ese paciente,
  // limpiamos el formulario
  if (editandoIndex.value === index) {
    limpiarFormulario();
  }
}

// Editar paciente
function editarPaciente(index) {
  const paciente = pacientes.value[index];

  Object.assign(novoPaciente, paciente);

  editandoIndex.value = index;

  // Mostrar el estado de validación del DNI
  dniComprobado.value = true;

  // Llevar el formulario hacia arriba
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
</script>



<style scoped>
.xestion-pacientes {
  width: 100%;
  padding: 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
}

/* =========================
   FORMULARIO
   ========================= */

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
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

.input-error:focus {
  border-color: #e53935 !important;
  box-shadow: 0 0 0 2px rgba(229, 57, 53, 0.15) !important;
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

/* =========================
   BOTÓN
   ========================= */

.btn-guardar {
  display: block;
  margin: 0.5rem auto 0;

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
  margin-top: 1rem;

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
</style>
