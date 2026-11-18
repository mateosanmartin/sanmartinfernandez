
<template>
  <div class="axenda-dia">
    <h4>Axenda do día</h4>

    <div class="barra-superior">
      <div class="filtro-data">
        <label for="data">Data:</label>
        <input
          id="data"
          v-model="dataEscollida"
          type="date"
        />
      </div>

      <button
        class="btn-pdf"
        :disabled="citasDoDia.length === 0"
        @click="exportarCitas"
      >
        🖨️
      </button>
    </div>

    <div class="selector-dias">
      <button
        class="btn-flecha"
        aria-label="Día anterior"
        @click="cambiarDia(-1)"
      >
        ❮
      </button>

      <div class="lista-dias">
        <button
          v-for="dia in dias"
          :key="dia"
          class="tarjeta-dia"
          :class="{ seleccionado: dia === dataEscollida }"
          :aria-pressed="dia === dataEscollida"
          @click="dataEscollida = dia"
        >
          <strong>{{ diaMes(dia) }}</strong>
          <span>{{ nomeDia(dia) }}</span>
          <small>
            {{ contarCitas(dia) }}
            {{ contarCitas(dia) === 1 ? "cita" : "citas" }}
          </small>
        </button>
      </div>

      <button
        class="btn-flecha"
        aria-label="Día seguinte"
        @click="cambiarDia(1)"
      >
        ❯
      </button>
    </div>

    <p v-if="cargando">Cargando citas...</p>

    <p v-else-if="errorCarga" class="erro">
      {{ errorCarga }}
    </p>

    <div v-else-if="citasDoDia.length > 0" class="tabla-contenedor">
      <table>
        <thead>
          <tr>
            <th>Hora</th>
            <th>DNI paciente</th>
            <th>Doctor</th>
            <th>Motivo</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cita in citasDoDia" :key="cita._id">
            <td>{{ cita.hora }}</td>
            <td>{{ cita.pacienteDNI }}</td>
            <td>{{ nomeDoctor(cita) }}</td>
            <td>{{ cita.motivo }}</td>
            <td>{{ cita.estado }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else class="sen-citas">
      Non hai citas para este día.
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { getCitas } from "../api/citas.js";
import { generarPDF } from "../utils/pdf.js";

function aTexto(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}

const hoxe = aTexto(new Date());

const citas = ref([]);
const dataEscollida = ref(hoxe);
const cargando = ref(true);
const errorCarga = ref("");

function sumarDias(data, cantidade) {
  const fecha = new Date(`${data}T12:00:00`);
  fecha.setDate(fecha.getDate() + cantidade);
  return aTexto(fecha);
}

function cambiarDia(cantidade) {
  dataEscollida.value = sumarDias(
    dataEscollida.value,
    cantidade
  );
}

const dias = computed(() =>
  [-2, -1, 0, 1, 2].map((n) =>
    sumarDias(dataEscollida.value, n)
  )
);

function diaMes(data) {
  const partes = data.split("-");
  return `${partes[2]}/${partes[1]}`;
}

function nomeDia(data) {
  return new Date(`${data}T12:00:00`).toLocaleDateString(
    "gl-ES",
    { weekday: "long" }
  );
}

function dataCita(cita) {
  if (!cita.fecha) return "";

  // Admite tanto "AAAA-MM-DD" como una fecha ISO.
  return String(cita.fecha).substring(0, 10);
}

function contarCitas(data) {
  return citas.value.filter(
    (c) =>
      dataCita(c) === data &&
      c.estado !== "borrada"
  ).length;
}

function nomeDoctor(cita) {
  const doctor = cita.doctorId;

  if (!doctor || typeof doctor !== "object") {
    return "(doctor eliminado)";
  }

  return `${doctor.nomedoc || ""} ${doctor.apeldoc || ""}`.trim();
}

const citasDoDia = computed(() =>
  citas.value
    .filter(
      (c) =>
        dataCita(c) === dataEscollida.value &&
        c.estado !== "borrada"
    )
    .sort((a, b) =>
      String(a.hora).localeCompare(String(b.hora))
    )
);

watch(dataEscollida, (valor) => {
  if (!valor) {
    dataEscollida.value = hoxe;
  }
});

onMounted(async () => {
  try {
    citas.value = await getCitas();
  } catch (error) {
    console.error("Erro ao cargar as citas:", error);
    errorCarga.value = "Non se puideron cargar as citas.";
  } finally {
    cargando.value = false;
  }
});

function exportarCitas() {
  if (citasDoDia.value.length === 0) return;

  const cabeceiras = [
    "Hora",
    "DNI paciente",
    "Doctor",
    "Motivo",
    "Estado"
  ];

  const filas = citasDoDia.value.map((cita) => [
    cita.hora,
    cita.pacienteDNI,
    nomeDoctor(cita),
    cita.motivo,
    cita.estado
  ]);

  generarPDF(
    `Axenda do día ${diaMes(dataEscollida.value)}`,
    cabeceiras,
    filas,
    `axenda_${dataEscollida.value}.pdf`
  );
}
</script>

<style scoped>
.axenda-dia {
  width: 100%;
  max-width: 1100px;
  margin: 20px auto;
  padding: 25px 30px 40px;
  box-sizing: border-box;
  background: white;
  border-radius: 8px;
}

.axenda-dia h4 {
  margin: 0 0 25px;
  padding: 12px 15px;
  background-color: #89fcbd;
  color: #174d32;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 600;
}

.barra-superior {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 25px;
}

.filtro-data {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filtro-data label {
  color: #174d32;
  font-weight: 600;
}

.filtro-data input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-pdf,
.btn-flecha {
  background: #4eaa7a;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 11px 18px;
  cursor: pointer;
}

.btn-pdf:hover,
.btn-flecha:hover {
  background: #368c61;
}

.btn-pdf:disabled {
  background: #aaa;
  cursor: not-allowed;
}

.selector-dias {
  display: flex;
  align-items: stretch;
  gap: 10px;
  margin-bottom: 30px;
}

.lista-dias {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.tarjeta-dia {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 15px 5px;
  border: 1px solid #d9e9df;
  border-radius: 8px;
  background: #f6faf8;
  color: #174d32;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
}

.tarjeta-dia:hover {
  background: #e3f5e9;
}

.tarjeta-dia.seleccionado {
  background: #4eaa7a;
  color: white;
  border-color: #4eaa7a;
}

.tarjeta-dia strong {
  font-size: 1.1rem;
}

.tarjeta-dia span {
  text-transform: capitalize;
}

.tarjeta-dia small {
  font-size: 0.8rem;
}

.tabla-contenedor {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

th {
  background: #89fcbd;
  color: #174d32;
  padding: 13px;
  text-align: center;
  border: 1px solid #c9e8d8;
}

td {
  padding: 13px;
  border: 1px solid #ddd;
}

tbody tr:nth-child(even) {
  background: #f6faf8;
}

tbody tr:hover {
  background: #e9f7ef;
}

.sen-citas {
  text-align: center;
  padding: 25px;
  color: #666;
}

.erro {
  color: #b42318;
  padding: 15px;
  background: #fff0ee;
  border-radius: 5px;
}

@media (max-width: 768px) {
  .axenda-dia {
    margin: 10px auto;
    padding: 20px 15px 30px;
  }

  .lista-dias {
    grid-template-columns: 1fr;
  }

  .tarjeta-dia:not(.seleccionado) {
    display: none;
  }

  .btn-flecha {
    padding: 10px 14px;
  }
}
</style>
