<template>
  <div class="xestion-pacientes">
    <h4>👥 Xestión de pacientes</h4>
    <form @submit.prevent="gardarPaciente">
      <div class="fila">
        <div class="campo campo-dni">
          <div class="campo campo-dni">
            <label>DNI/NIE:</label>
            <div class="input-container">
              <input
                v-model="novoPaciente.dni"
                type="text"
                required
                style="text-align: center"
                :class="{ 'input-error': dniInvalido }"
                @blur="validarDNIFormulario"
              />
            </div>
          </div>
        </div>
        <div class="campo campo-nome">
          <label>Nome:</label>
          <input v-model="novoPaciente.nome" type="text" required />
        </div>
        <div class="campo campo-apelidos">
          <label>Apelidos:</label>
          <input v-model="novoPaciente.apelidos" type="text" required />
        </div>
      </div>
      <div class="fila">
        <div class="campo campo-fechaNacimiento">
          <label>Fecha Nacimiento:</label>
          <input v-model="novoPaciente.fechaNacimiento" type="date" required />
        </div>
        <div class="campo campo-correo">
          <label>Correo:</label>
          <input
            v-model="novoPaciente.correo"
            type="email"
            required
            :class="{ 'input-error': correoInvalido }"
            @blur="validarCorreoFormulario"
          />
        </div>
        <div class="campo campo-movil">
          <label>Móvil:</label>
          <input
            v-model="novoPaciente.movil"
            type="tel"
            required
            :class="{ 'input-error': movilInvalido }"
            @blur="validarMovilFormulario"
          />
        </div>
      </div>
      <div class="fila">
        <div class="campo campo-direccion">
          <label>Dirección:</label>
          <input v-model="novoPaciente.direccion" type="text" required />
        </div>

        <div class="campo campo-provincia">
          <label>Provincia:</label>
          <select v-model="novoPaciente.provincia" required>
            <option value="" disabled>Selecciona unha provincia</option>

            <option
              v-for="provincia in provincias"
              :key="provincia.id"
              :value="provincia.id"
            >
              {{ provincia.nombre }}
            </option>
          </select>
        </div>
        <div class="campo campo-municipio">
          <label>Municipio:</label>
          <select v-model="novoPaciente.municipio" disabled>
            <option value="">Selecciona un municipio</option>
          </select>
        </div>
      </div>
      <span v-if="dniInvalido" class="mensaje-error">
        ⚠️ DNI/NIE non válido ⚠️</span
      >
      <span v-if="correoInvalido" class="mensaje-error">
        ⚠️ Correo non válido ⚠️
      </span>
      <span v-if="movilInvalido" class="mensaje-error">
        ⚠️ Número de teléfono non válido ⚠️
      </span>
      <button
        type="submit"
        class="btn-guardar"
        :disabled="novoPaciente.dni === '' || novoPaciente.nome === ''"
      >
        Gardar
      </button>
    </form>
    <h4>📋 Listaxe de pacientes</h4>
    <table v-if="pacientes.length > 0">
      <thead>
        <tr>
          <th>#</th>
          <th>DNI/CIF</th>
          <th>Nome</th>
          <th>Apelidos</th>
          <th>Fecha Nacimiento</th>
          <th>Correo</th>
          <th>Móvil</th>
          <th>Accións</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(u, index) in pacientes" :key="index">
          <td style="text-align: center">{{ index + 1 }}</td>
          <td style="text-align: center">{{ u.dni }}</td>
          <td style="text-align: left">{{ u.nome }}</td>
          <td style="text-align: left">{{ u.apelidos }}</td>
          <td>{{ u.fechaNacimiento }}</td>
          <td style="text-align: left">{{ u.correo }}</td>
          <td style="text-align: center">{{ u.movil }}</td>
          <td style="text-align: center">
            <button @click="editarPaciente(index)" title="Editar">✏️</button>
            <button @click="eliminarPaciente(index)" title="Eliminar">
              🗑️
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Non hai pacientes cargados.</p>
  </div>
</template>

<script setup>
/// Zona de declaracións
import { ref, reactive, onMounted } from "vue";

const pacientes = ref([]); //almacena la lista de pacientes e os seus cambios

const novoPaciente = reactive({
  dni: "",
  nome: "",
  apelidos: "",
  fechaNacimiento: "",
  correo: "",
  movil: "",
  direccion: "",
  provincia: "",
  municipio: "",
});

const pacienteEditando = ref(null);

const dniInvalido = ref(false);
const correoInvalido = ref(false);
const movilInvalido = ref(false);

const provincias = [
  { id: 1, nombre: "A Coruña" },
  { id: 2, nombre: "Álava" },
  { id: 3, nombre: "Albacete" },
  { id: 4, nombre: "Alicante" },
  { id: 5, nombre: "Almería" },
  { id: 6, nombre: "Asturias" },
  { id: 7, nombre: "Ávila" },
  { id: 8, nombre: "Badajoz" },
  { id: 9, nombre: "Barcelona" },
  { id: 10, nombre: "Bizkaia" },
  { id: 11, nombre: "Burgos" },
  { id: 12, nombre: "Cáceres" },
  { id: 13, nombre: "Cádiz" },
  { id: 14, nombre: "Cantabria" },
  { id: 15, nombre: "Castellón" },
  { id: 16, nombre: "Ceuta" },
  { id: 17, nombre: "Ciudad Real" },
  { id: 18, nombre: "Córdoba" },
  { id: 19, nombre: "Cuenca" },
  { id: 20, nombre: "Gipuzkoa" },
  { id: 21, nombre: "Girona" },
  { id: 22, nombre: "Granada" },
  { id: 23, nombre: "Guadalajara" },
  { id: 24, nombre: "Huelva" },
  { id: 25, nombre: "Huesca" },
  { id: 26, nombre: "Illes Balears" },
  { id: 27, nombre: "Jaén" },
  { id: 28, nombre: "La Rioja" },
  { id: 29, nombre: "Las Palmas" },
  { id: 30, nombre: "León" },
  { id: 31, nombre: "Lleida" },
  { id: 32, nombre: "Lugo" },
  { id: 33, nombre: "Madrid" },
  { id: 34, nombre: "Málaga" },
  { id: 35, nombre: "Melilla" },
  { id: 36, nombre: "Murcia" },
  { id: 37, nombre: "Navarra" },
  { id: 38, nombre: "Ourense" },
  { id: 39, nombre: "Palencia" },
  { id: 40, nombre: "Pontevedra" },
  { id: 41, nombre: "Salamanca" },
  { id: 42, nombre: "Santa Cruz de Tenerife" },
  { id: 43, nombre: "Segovia" },
  { id: 44, nombre: "Sevilla" },
  { id: 45, nombre: "Soria" },
  { id: 46, nombre: "Tarragona" },
  { id: 47, nombre: "Teruel" },
  { id: 48, nombre: "Toledo" },
  { id: 49, nombre: "Valencia" },
  { id: 50, nombre: "Valladolid" },
  { id: 51, nombre: "Zamora" },
  { id: 52, nombre: "Zaragoza" },
];

/// Zona de ciclo de vida

onMounted(() => {
  pacientes.value = [
    {
      dni: "12345678Z",
      nome: "María",
      apelidos: "García López",
      fechaNacimiento: "1985-03-14",
      correo: "maria.garcia@email.com",
      movil: "600123456",
      direccion: "Rúa do Príncipe, 24, 2º A, Vigo",
    },
    {
      dni: "87654321X",
      nome: "Xosé",
      apelidos: "Fernández Rodríguez",
      fechaNacimiento: "1978-07-22",
      correo: "xose.fernandez@email.com",
      movil: "611234567",
      direccion: "Rúa Real, 15, 1º, A Coruña",
    },
    {
      dni: "23456789D",
      nome: "Laura",
      apelidos: "Pérez González",
      fechaNacimiento: "1992-11-05",
      correo: "laura.perez@email.com",
      movil: "622345678",
      direccion: "Rúa Bispo Aguirre, 8, 3º B, Lugo",
    },
    {
      dni: "34567890V",
      nome: "Manuel",
      apelidos: "López Castro",
      fechaNacimiento: "1969-01-30",
      correo: "manuel.lopez@email.com",
      movil: "633456789",
      direccion: "Rúa do Paseo, 32, 2º, Ourense",
    },
  ];
});

function validarDNI(dni) {
  const letras = "TRWAGMYFPDXBNJZSQVHLCKE";

  dni = dni.toUpperCase().trim();

  // NIE: X, Y o Z + 7 números + letra
  if (/^[XYZ]\d{7}[A-Z]$/.test(dni)) {
    const nie = dni.replace("X", "0").replace("Y", "1").replace("Z", "2");

    const numero = parseInt(nie.substring(0, 8), 10);
    const letra = nie.charAt(8);

    return letras[numero % 23] === letra;
  }

  // DNI: 8 números + letra
  if (/^\d{8}[A-Z]$/.test(dni)) {
    const numero = parseInt(dni.substring(0, 8), 10);
    const letra = dni.charAt(8);

    return letras[numero % 23] === letra;
  }

  return false;
}

function validarDNIFormulario() {
  if (novoPaciente.dni.trim() === "") {
    dniInvalido.value = false;
    return;
  }

  dniInvalido.value = !validarDNI(novoPaciente.dni);
}

function validarCorreo(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

function validarMovil(movil) {
  const regex = /^[6789]\d{8}$/;
  return regex.test(movil);
}

function validarCorreoFormulario() {
  correoInvalido.value = !validarCorreo(novoPaciente.correo);
}

function validarMovilFormulario() {
  movilInvalido.value = !validarMovil(novoPaciente.movil);
}

/// Zona de métodos ou funcións

function gardarPaciente() {
  if (!validarDNI(novoPaciente.dni)) {
    alert("O DNI introducido non é válido");
    return;
  }

  if (pacienteEditando.value !== null) {
    // Editar o paciente existente
    pacientes.value[pacienteEditando.value] = {
      ...novoPaciente,
    };
  } else {
    // Crear un paciente novo
    pacientes.value.push({
      ...novoPaciente,
    });
  }

  // Limpar o formulario
  Object.assign(novoPaciente, {
    dni: "",
    nome: "",
    apelidos: "",
    fechaNacimiento: "",
    correo: "",
    movil: "",
    direccion: "",
    provincia: "",
    municipio: "",
  });

  // Volver ao modo "crear"
  pacienteEditando.value = null;
}

function cambiarProvincia() {
  novoPaciente.municipio = "";
}

function eliminarPaciente(index) {
  pacientes.value.splice(index, 1); //elimina o paciente da lista
}

function editarPaciente(index) {
  pacienteEditando.value = index;

  const paciente = pacientes.value[index];

  Object.assign(novoPaciente, paciente);
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
  border-color: #5fcf91;
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
