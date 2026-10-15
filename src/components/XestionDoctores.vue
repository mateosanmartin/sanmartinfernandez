<template>
  <div class="xestion-doctor">
    <h4>🧑‍⚕️ Xestión de doctores</h4>
    <form @submit.prevent="guardarDoctor">
      <div class="fila">
        <div
          v-if="novoDoctor.iddoc !== '' && (!validarDni() || !validarDni2())"
          class="error-message"
        >
          <p class="error">O DNI/CIF non é válido</p>
        </div>
        <div class="campo campo-nome">
          <label>Nome:</label>
          <input
            v-model="novoDoctor.nomedoc"
            type="text"
            @keyup.enter="corrixirNome()"
            @blur="corrixirNome()"
            required
          />
        </div>
        <div class="campo campo-apelido">
          <label>Apelidos:</label>
          <input
            v-model="novoDoctor.apeldoc"
            type="text"
            @keyup.enter="corrixirApelido()"
            @blur="corrixirApelido()"
            required
          />
        </div>
        <div class="campo campo-colexiacion">
          <label>Colexiado:</label>
          <select id="colexiacion" v-model="novoDoctor.coledoc" required>
            <option value="" disabled selected>Seleccionar</option>
            <option :value="true">Si</option>
            <option :value="false">Non</option>
          </select>
        </div>
      </div>
      <div class="fila">
        <div class="campo campo-correo">
          <label>Correo:</label>
          <input v-model="novoDoctor.maildoc" type="email" required />
        </div>
        <div class="campo campo-especialidad">
          <label>Especialidade:</label>
          <select id="especialidad" v-model="novoDoctor.espedoc" required>
            <option value="">Selecciona unha especialidad</option>
            <option
              v-for="especialidad in especialidades"
              :key="especialidad.id"
              :value="especialidad.nm"
            >
              {{ especialidad.nm }}
            </option>
          </select>
        </div>
        <div class="campo campo-telefono">
          <label>Telefono:</label>
          <input v-model="novoDoctor.movildoc" type="text" required />
        </div>
        <div
          v-if="novoDoctor.movildoc !== '' && !validarTelf()"
          class="error-message"
        >
          <p class="error">O teléfono non é válido</p>
        </div>
      </div>
      <div class="fila">
      </div>
      <div class="campo-condicions">
        <label>
          <input v-model="novoDoctor.loddoc" type="checkbox" /> Aceptar la
          <router-link
            class="link-politica"
            to="/politicaprivacidad"
            target="_blank"
            required
          >
            política de privacidad
          </router-link>
        </label>
      </div>
      <div class="botones-formulario">
        <button
          type="submit"
          class="btn-guardar"
          :disabled="
            novoDoctor.nomedoc === '' ||
            novoDoctor.apeldoc === '' ||
            !novoDoctor.espedoc
          "
        >
          Gardar
        </button>
        <button type="button" class="btn-limpiar" @click="limpiaFormdoc">
          🧹
        </button>
      </div>
    </form>
    <h4>📋 Listaxe de doctores</h4>
    <table v-if="doctores.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Apelidos</th>
          <th>Nome</th>
          <th>Móvil</th>
          <th>Especialidad</th>
          <th>Accións</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(u, index) in doctores" :key="index">
          <td style="text-align: center">{{ index + 1 }}</td>
          <td style="text-align: center">{{ u.iddoc }}</td>
          <td>{{ u.apeldoc }}</td>
          <td>{{ u.nomedoc }}</td>
          <td>{{ u.movildoc }}</td>
          <td style="text-align: center">{{ u.espedoc }}</td>
          <td style="text-align: center">
            <button @click="editarDoctor(index)" title="Editar">✏️</button>
            <button @click="eliminarDoctor(index)" title="Eliminar">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Non hai doctores cargados.</p>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { obtenerEspecialidades } from "../api/especialidades.js";
import {
  saveDoctor,
  getDoctores,
  getDoctorByEspecialidad,
  modifyDoctor,
  deleteDoctor,
} from "../api/doctores.js";

const doctores = ref([]); //almacena la lista de doctores e os seus cambios
const especialidades = ref([]);

const novoDoctor = reactive({
  iddoc: "",
  nomedoc: "",
  apeldoc: "",
  maildoc: "",
  movildoc: "",
  coledoc: "",
  espedoc: "",
});

onMounted(async () => {
  especialidades.value = await obtenerEspecialidades();
});

// Funciones auxiliares
function corrixirNome() {
  if (novoDoctor.nomedoc.length > 0) {
    novoDoctor.nomedoc = novoDoctor.nomedoc
      .trim()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
}

function corrixirApelido() {
  if (novoDoctor.apeldoc.length > 0) {
    novoDoctor.apeldoc = novoDoctor.apeldoc
      .trim()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
}

function validarTelf() {
  const telfRegex = /^[6|7]\d{8}$/;
  if (novoDoctor.movildoc != "") {
    return telfRegex.test(novoDoctor.movildoc.trim());
  }
}

const limpiaFormdoc = () => {
  Object.assign(novoDoctor, {
    iddoc: "",
    nomedoc: "",
    apeldoc: "",
    maildoc: "",
    movildoc: "",
    coledoc: "",
    espedoc: "",
  });
  // editando.value = false;
  validarTelf.value = false;
};
</script>

<style scoped>
.xestion-doctor {
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
  box-sizing: border-box;
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
  background-color: #ffffff;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.campo input:focus,
.campo select:focus {
  outline: none;
  border-color: #348358;
  box-shadow: 0 0 0 2px rgba(95, 207, 145, 0.15);
}

/* Anchos específicos */

.campo-id,
.campo-nome,
.campo-apelido,
.campo-data-nacimiento,
.campo-correo,
.campo-telefono,
.campo-especialidad {
  width: 100%;
}

/* =========================
   MENSAJES DE ERROR
   ========================= */

.error-message {
  width: 100%;
  margin: 0;
  color: #e53935;
  font-size: 0.8rem;
  font-weight: 600;
}

.error {
  margin: 0;
  color: #e53935;
  font-size: 0.8rem;
  font-weight: 600;
}

.campo input:invalid:focus {
  border-color: #e53935;
}

/* =========================
   POLÍTICA DE PRIVACIDAD
   ========================= */

.campo-condicions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  margin-top: 0.2rem;
}

.campo-condicions label {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-wrap: wrap;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
}

.campo-condicions input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #348358;
}

.link-politica {
  color: rgb(74, 189, 93);
}

.link-politica:hover {
  color: rgb(1, 129, 59);
}

/* =========================
   BOTONES DEL FORMULARIO
   ========================= */

.botones-formulario {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

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
  width: 34.22px;
  height: 40.78px;

  background-color: #ffffff;
  border: 1px solid #000000;
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

.btn-limpiar:active {
  transform: scale(0.95);
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

.tabla-contenedor {
  width: 100%;
  margin-bottom: 0;
  overflow-x: auto;
}

table {
  width: 100%;
  margin-top: 0.3rem;

  border-collapse: collapse;

  font-size: 0.85rem;
  background-color: #ffffff;

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

  background: #ffffff;
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
   MENSAJE SIN DOCTORES
   ========================= */

.xestion-doctor > p {
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
  .xestion-doctor {
    padding: 1rem;
    border-radius: 5px;
  }

  .fila {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    align-items: stretch;
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

  .campo-condicions {
    justify-content: flex-start;
  }

  .botones-formulario {
    flex-wrap: wrap;
  }

  /* Permite desplazar la tabla horizontalmente */
  .tabla-contenedor {
    overflow-x: auto;
  }

  table {
    min-width: 650px;
    white-space: nowrap;
  }

  th,
  td {
    padding: 0.6rem;
  }
}
</style>
