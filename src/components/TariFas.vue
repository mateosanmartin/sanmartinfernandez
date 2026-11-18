
<template>
  <div class="tarifas">
    <h4>Tarifas</h4>

    <p>
      Consulta as tarifas dos diferentes servizos de Sanidade Teis.
    </p>

    <div class="filtros">
      <label for="servizo">Servizo:</label>
      <select id="servizo" v-model="filtroServizo">
        <option value="">Todos</option>
        <option
          v-for="servizo in servizos"
          :key="servizo"
          :value="servizo"
        >
          {{ servizo }}
        </option>
      </select>
    </div>

    <div class="tabla-contenedor">
      <table>
        <thead>
          <tr>
            <th>Servizo</th>
            <th>Concepto</th>
            <th>Prezo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tarifa in tarifasFiltradas" :key="tarifa.id">
            <td>{{ tarifa.servizo }}</td>
            <td>{{ tarifa.concepto }}</td>
            <td class="prezo">{{ tarifa.prezo }} €</td>
          </tr>
          <tr v-if="tarifasFiltradas.length === 0">
            <td colspan="3" class="sen-datos">
              Non hai tarifas dispoñibles.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="aviso">
      <strong>Importante:</strong> As tarifas son orientativas
      e forman parte dun proxecto educativo.
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const filtroServizo = ref("");

const tarifas = ref([
  { id: 1, servizo: "Consulta médica", concepto: "Consulta xeral", prezo: 40 },
  { id: 2, servizo: "Consulta médica", concepto: "Consulta de revisión", prezo: 25 },
  { id: 3, servizo: "Pediatría", concepto: "Consulta pediátrica", prezo: 45 },
  { id: 4, servizo: "Pediatría", concepto: "Revisión infantil", prezo: 30 },
  { id: 5, servizo: "Enfermería", concepto: "Curas e vendaxes", prezo: 20 },
  { id: 6, servizo: "Enfermería", concepto: "Control de tensión", prezo: 10 },
  { id: 7, servizo: "Análises clínicas", concepto: "Analítica básica", prezo: 35 },
  { id: 8, servizo: "Análises clínicas", concepto: "Analítica completa", prezo: 65 }
]);

const servizos = computed(() =>
  [...new Set(tarifas.value.map((t) => t.servizo))]
);

const tarifasFiltradas = computed(() =>
  tarifas.value.filter(
    (t) =>
      filtroServizo.value === "" ||
      t.servizo === filtroServizo.value
  )
);
</script>

<style scoped>
.tarifas {
  width: 100%;
  max-width: 1100px;
  margin: 20px auto;
  padding: 25px 30px 40px;
  box-sizing: border-box;
  background: white;
  border-radius: 8px;
}

.tarifas h4 {
  margin: 0 0 25px;
  padding: 12px 15px;
  background-color: #89fcbd;
  color: #174d32;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 600;
}

.tarifas p {
  color: #333;
  line-height: 1.6;
  font-size: 0.95rem;
}

.filtros {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 25px 0;
}

.filtros label {
  font-weight: 600;
  color: #174d32;
}

.filtros select {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: white;
  min-width: 180px;
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
  background-color: #89fcbd;
  color: #174d32;
  text-align: center;
  padding: 13px;
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

.prezo {
  text-align: right;
  white-space: nowrap;
}

.sen-datos {
  text-align: center;
}

.aviso {
  margin-top: 30px;
  padding: 15px;
  background: #f3f7f5;
  border-left: 4px solid #5fcf91;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .tarifas {
    margin: 10px auto;
    padding: 20px 15px 30px;
  }

  .filtros {
    flex-wrap: wrap;
  }
}
</style>
