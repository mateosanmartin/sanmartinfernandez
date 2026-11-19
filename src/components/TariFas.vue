
<template>
  <!-- Contenedor principal de la página de tarifas -->
  <div class="tarifas">
    <h4>Tarifas</h4>

    <p>
      Consulta as tarifas dos diferentes servizos de Sanidade Teis.
    </p>

    <!-- Zona para filtrar las tarifas por servicio -->
    <div class="filtros">
      <label for="servizo">Servizo:</label>

      <!--
        v-model conecta el select con filtroServizo.
        Cada vez que elegimos una opción, filtroServizo cambia.
      -->
      <select id="servizo" v-model="filtroServizo">
        <option value="">Todos</option>

        <!--
          v-for recorre el array servizos.
          :key identifica cada opción.
          :value guarda el nombre del servicio seleccionado.
        -->
        <option
          v-for="servizo in servizos"
          :key="servizo"
          :value="servizo"
        >
          {{ servizo }}
        </option>
      </select>
    </div>

    <!-- Permite desplazar la tabla horizontalmente en móvil -->
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
          <!--
            Recorremos únicamente las tarifas filtradas.
            Si no hay filtro, aparecen todas.
          -->
          <tr v-for="tarifa in tarifasFiltradas" :key="tarifa.id">
            <td>{{ tarifa.servizo }}</td>
            <td>{{ tarifa.concepto }}</td>
            <td class="prezo">{{ tarifa.prezo }} €</td>
          </tr>

          <!--
            Si el filtro no encuentra resultados,
            mostramos un mensaje en lugar de una tabla vacía.
          -->
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
// ref: crea variables reactivas.
// computed: calcula valores que se actualizan automáticamente
// cuando cambian las variables reactivas utilizadas.
import { ref, computed } from "vue";

// Guarda el servicio seleccionado en el desplegable.
// Una cadena vacía significa que queremos mostrar todos.
const filtroServizo = ref("");

// Array con los datos de las tarifas.
// Es estático: no se consulta ninguna API ni base de datos.
// ref permite que Vue reaccione si modificamos el array.
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

/*
  FUNCIÓN: servizos

  OBJETIVO:
  Obtener los nombres de los servicios sin repetirlos.

  PASO A PASO:
  1. tarifas.value accede al array de tarifas.
  2. map() crea un array con los nombres de los servicios.
  3. new Set() elimina los nombres repetidos.
  4. [... ] convierte el Set en un array normal.

  EJEMPLO:
  ["Pediatría", "Pediatría", "Enfermería"]
  se convierte en:
  ["Pediatría", "Enfermería"]

  Es computed porque depende del array reactivo tarifas.
*/
const servizos = computed(() =>
  [...new Set(tarifas.value.map((t) => t.servizo))]
);

/*
  FUNCIÓN: tarifasFiltradas

  OBJETIVO:
  Mostrar únicamente las tarifas del servicio seleccionado.

  PASO A PASO:
  1. filter() recorre todas las tarifas.
  2. Si filtroServizo está vacío, devuelve true
     para todas las tarifas.
  3. Si hay un servicio seleccionado, comprueba
     que el servicio de la tarifa coincida.
  4. Devuelve un nuevo array con las coincidencias.

  EJEMPLO:
  Si seleccionamos "Pediatría", únicamente aparecen
  las tarifas correspondientes a Pediatría.

  IMPORTANTE:
  filter() no modifica el array original.
*/
const tarifasFiltradas = computed(() =>
  tarifas.value.filter(
    (t) =>
      filtroServizo.value === "" ||
      t.servizo === filtroServizo.value
  )
);
</script>

<style scoped>
/*
  scoped significa que estos estilos se aplican
  a los elementos de este componente.
*/

/* Contenedor principal, igual que las páginas informativas */
.tarifas {
  width: 100%;
  max-width: 1100px;
  margin: 20px auto;
  padding: 25px 30px 40px;
  box-sizing: border-box;
  background: white;
  border-radius: 8px;
}

/* Título verde común a las páginas de Sanidade Teis */
.tarifas h4 {
  margin: 0 0 25px;
  padding: 12px 15px;
  background-color: #89fcbd;
  color: #174d32;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 600;
}

/* Estilo de los párrafos */
.tarifas p {
  color: #333;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Coloca la etiqueta y el desplegable en la misma fila */
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

/* Estilo del desplegable */
.filtros select {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: white;
  min-width: 180px;
}

/* Evita que la tabla desborde la pantalla */
.tabla-contenedor {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

/* Cabecera de la tabla */
th {
  background-color: #89fcbd;
  color: #174d32;
  text-align: center;
  padding: 13px;
  border: 1px solid #c9e8d8;
}

/* Celdas de la tabla */
td {
  padding: 13px;
  border: 1px solid #ddd;
}

/* Colorea las filas pares */
tbody tr:nth-child(even) {
  background: #f6faf8;
}

/* Resalta la fila sobre la que está el ratón */
tbody tr:hover {
  background: #e9f7ef;
}

/* Alinea los precios a la derecha */
.prezo {
  text-align: right;
  white-space: nowrap;
}

.sen-datos {
  text-align: center;
}

/* Recuadro informativo inferior */
.aviso {
  margin-top: 30px;
  padding: 15px;
  background: #f3f7f5;
  border-left: 4px solid #5fcf91;
  border-radius: 4px;
}

/* Ajustes para móviles */
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
