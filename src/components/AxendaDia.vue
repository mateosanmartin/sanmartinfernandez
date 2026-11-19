
<template>
  <!--
    CONTENEDOR PRINCIPAL

    class="axenda-dia":
    Aplica los estilos CSS de la agenda.

    Todo lo que aparece dentro de este div
    pertenece a la vista de la agenda diaria.
  -->
  <div class="axenda-dia">

    <!-- Título principal de la agenda. -->
    <h4>Axenda do día</h4>

    <!--
      BARRA SUPERIOR

      Contiene dos elementos:
      1. Un selector de fecha.
      2. Un botón para exportar las citas a PDF.
    -->
    <div class="barra-superior">

      <!-- Contenedor del filtro por fecha. -->
      <div class="filtro-data">

        <!--
          LABEL

          for="data" relaciona esta etiqueta
          con el input cuyo id sea "data".

          Al pulsar sobre la etiqueta, el navegador
          puede activar el campo correspondiente.
        -->
        <label for="data">Data:</label>

        <!--
          INPUT DE FECHA

          id="data":
          Identificador del campo.

          v-model="dataEscollida":
          Vincula el input con la variable reactiva
          dataEscollida definida en el script.

          v-model establece una vinculación
          bidireccional:

          - Si el usuario cambia la fecha del input,
            se actualiza dataEscollida.

          - Si el script modifica dataEscollida,
            el input muestra la nueva fecha.

          type="date":
          Permite seleccionar una fecha mediante
          el control de fechas del navegador.

          EJEMPLO:
          Si seleccionamos el 19/11/2026,
          dataEscollida tendrá "2026-11-19".

          IMPORTANTE:
          En el template no necesitamos escribir
          dataEscollida.value.
        -->
        <input
          id="data"
          v-model="dataEscollida"
          type="date"
        />
      </div>

      <!--
        BOTÓN PARA EXPORTAR PDF

        class="btn-pdf":
        Aplica los estilos del botón.

        :disabled="citasDoDia.length === 0":
        Vincula dinámicamente el atributo disabled.

        Si no hay citas para el día seleccionado,
        citasDoDia.length será 0.

        La expresión será true y el botón
        permanecerá deshabilitado.

        Si hay al menos una cita,
        la expresión será false y el botón
        estará habilitado.

        @click="exportarCitas":
        Ejecuta la función exportarCitas()
        cuando el usuario pulsa el botón.

        🖨️:
        Icono visual de impresión.
      -->
      <button
        class="btn-pdf"
        :disabled="citasDoDia.length === 0"
        @click="exportarCitas"
      >
        🖨️
      </button>
    </div>

    <!--
      SELECTOR DE DÍAS

      Permite desplazarnos entre fechas.

      Contiene:
      - Flecha para retroceder.
      - Cinco tarjetas de días.
      - Flecha para avanzar.
    -->
    <div class="selector-dias">

      <!--
        BOTÓN: DÍA ANTERIOR

        aria-label:
        Proporciona una descripción accesible
        del botón.

        @click="cambiarDia(-1)":
        Llama a cambiarDia() pasando -1.

        En el script, cambiarDia() utiliza
        sumarDias() para restar un día
        a la fecha seleccionada.

        ❮:
        Símbolo de flecha hacia la izquierda.
      -->
      <button
        class="btn-flecha"
        aria-label="Día anterior"
        @click="cambiarDia(-1)"
      >
        ❮
      </button>

      <!--
        LISTA DE DÍAS

        Aquí se generan dinámicamente
        las tarjetas de las fechas.
      -->
      <div class="lista-dias">

        <!--
          DIRECTIVA v-for

          v-for="dia in dias":
          Recorre el array dias.

          dias es un computed del script que
          devuelve cinco fechas:

          - Dos días anteriores.
          - Un día anterior.
          - Día seleccionado.
          - Un día posterior.
          - Dos días posteriores.

          Por cada fecha del array,
          Vue genera un botón.

          :key="dia":
          Asigna una clave única a cada botón.

          Vue utiliza esa clave para identificar
          correctamente los elementos repetidos.

          class="tarjeta-dia":
          Clase CSS que siempre se aplica.

          :class="{ seleccionado: dia === dataEscollida }":
          Añade dinámicamente la clase
          "seleccionado" cuando la fecha de
          la tarjeta coincide con la fecha elegida.

          EJEMPLO:

          Si dia === dataEscollida es true,
          el botón tendrá las clases:
          "tarjeta-dia seleccionado".

          :aria-pressed="dia === dataEscollida":
          Indica mediante un atributo accesible
          si este botón representa el día activo.

          @click="dataEscollida = dia":
          Cuando pulsamos una tarjeta,
          guardamos su fecha en dataEscollida.

          Como dataEscollida es reactiva,
          Vue actualiza las tarjetas y la tabla.
        -->
        <button
          v-for="dia in dias"
          :key="dia"
          class="tarjeta-dia"
          :class="{ seleccionado: dia === dataEscollida }"
          :aria-pressed="dia === dataEscollida"
          @click="dataEscollida = dia"
        >

          <!--
            INTERPOLACIÓN CON FUNCIÓN

            {{ diaMes(dia) }}:
            Llama a la función diaMes() del script
            pasando la fecha de la tarjeta.

            Esa función devuelve el día y el mes.

            EJEMPLO:
            "2026-11-19" -> "19/11"

            strong:
            Destaca visual y semánticamente el texto.
          -->
          <strong>{{ diaMes(dia) }}</strong>

          <!--
            NOMBRE DEL DÍA

            {{ nomeDia(dia) }}:
            Ejecuta la función nomeDia().

            Esa función utiliza toLocaleDateString()
            con la configuración "gl-ES".

            EJEMPLO:
            "2026-11-19" -> "xoves"
          -->
          <span>{{ nomeDia(dia) }}</span>

          <!--
            CONTADOR DE CITAS

            {{ contarCitas(dia) }}:
            Llama a contarCitas() con la fecha actual
            del bucle.

            La función cuenta las citas de ese día
            que no tienen estado "borrada".

            EXPRESIÓN TERNARIA:

            condicion ? valorSiTrue : valorSiFalse

            contarCitas(dia) === 1
              ? "cita"
              : "citas"

            Si hay exactamente una cita,
            muestra la palabra "cita".

            En cualquier otro caso,
            muestra la palabra "citas".

            EJEMPLOS:
            0 citas
            1 cita
            3 citas
          -->
          <small>
            {{ contarCitas(dia) }}
            {{ contarCitas(dia) === 1 ? "cita" : "citas" }}
          </small>
        </button>
      </div>

      <!--
        BOTÓN: DÍA SIGUIENTE

        @click="cambiarDia(1)":
        Ejecuta cambiarDia() con el argumento 1.

        Esto suma un día a la fecha seleccionada.

        La diferencia con el botón anterior
        es el argumento que recibe la función:

        -1 -> retroceder.
         1 -> avanzar.
      -->
      <button
        class="btn-flecha"
        aria-label="Día seguinte"
        @click="cambiarDia(1)"
      >
        ❯
      </button>
    </div>

    <!--
      RENDERIZADO CONDICIONAL

      A continuación tenemos una cadena de
      condiciones:

      v-if
      v-else-if
      v-else-if
      v-else

      Vue evalúa las condiciones en orden
      y muestra únicamente la primera
      rama cuya condición se cumple.

      Estas ramas deben mantenerse consecutivas
      en el template.
    -->

    <!--
      PRIMERA CONDICIÓN: CARGANDO

      v-if="cargando":
      Muestra este párrafo cuando cargando es true.

      En el script, cargando comienza en true.

      Cuando termina la petición a la API,
      pasa a false mediante el bloque finally.
    -->
    <p v-if="cargando">Cargando citas...</p>

    <!--
      SEGUNDA CONDICIÓN: ERROR

      v-else-if="errorCarga":
      Solo se evalúa si cargando es false.

      Si errorCarga contiene un mensaje,
      Vue muestra este párrafo.

      {{ errorCarga }}:
      Muestra el texto del error.

      class="erro":
      Aplica los estilos CSS del mensaje de error.
    -->
    <p v-else-if="errorCarga" class="erro">
      {{ errorCarga }}
    </p>

    <!--
      TERCERA CONDICIÓN: HAY CITAS

      v-else-if="citasDoDia.length > 0":
      Solo se evalúa si:

      - No estamos cargando.
      - No existe un error de carga.

      Además, comprueba que el array de citas
      del día seleccionado tenga elementos.

      Si hay citas, se muestra la tabla.

      citasDoDia es una propiedad computed
      que filtra y ordena las citas.
    -->
    <div v-else-if="citasDoDia.length > 0" class="tabla-contenedor">

      <!--
        TABLA HTML

        table:
        Representa una tabla.

        thead:
        Contiene la cabecera.

        tbody:
        Contiene los datos.

        tr:
        Representa una fila.

        th:
        Representa una celda de cabecera.

        td:
        Representa una celda de datos.
      -->
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

          <!--
            BUCLE DE CITAS

            v-for="cita in citasDoDia":
            Recorre todas las citas del día
            seleccionado.

            Por cada cita genera una fila <tr>.

            :key="cita._id":
            Utiliza el identificador de MongoDB
            como clave única de cada fila.

            cita es el objeto actual del bucle.

            Sus propiedades se muestran en
            las distintas celdas de la tabla.
          -->
          <tr v-for="cita in citasDoDia" :key="cita._id">

            <!-- Hora de la cita. -->
            <td>{{ cita.hora }}</td>

            <!-- DNI del paciente asociado a la cita. -->
            <td>{{ cita.pacienteDNI }}</td>

            <!--
              NOMBRE DEL DOCTOR

              nomeDoctor(cita):
              Llama a una función del script.

              La función utiliza cita.doctorId
              para obtener el nombre y los apellidos.

              Si el doctor ya no existe,
              devuelve "(doctor eliminado)".
            -->
            <td>{{ nomeDoctor(cita) }}</td>

            <!-- Motivo de la consulta. -->
            <td>{{ cita.motivo }}</td>

            <!-- Estado actual de la cita. -->
            <td>{{ cita.estado }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--
      ÚLTIMA CONDICIÓN: NO HAY CITAS

      v-else:
      Se ejecuta cuando ninguna de las
      condiciones anteriores se cumple.

      Es decir:

      - La carga ha terminado.
      - No se ha producido un error.
      - No hay citas para el día seleccionado.

      No necesita una expresión porque
      representa el caso restante.
    -->
    <p v-else class="sen-citas">
      Non hai citas para este día.
    </p>
  </div>
</template>


<script setup>
// ref: permite crear variables reactivas.
// computed: calcula valores automáticamente cuando cambian sus dependencias.
// onMounted: ejecuta código cuando el componente se monta.
// watch: observa una variable reactiva y ejecuta código cuando cambia.
import { ref, computed, onMounted, watch } from "vue";

// Función de nuestra API para obtener las citas del backend.
import { getCitas } from "../api/citas.js";

// Función que genera un archivo PDF con los datos que le pasemos.
import { generarPDF } from "../utils/pdf.js";

/*
  FUNCIÓN: aTexto(data)

  OBJETIVO:
  Convertir una fecha de JavaScript en una cadena "AAAA-MM-DD".

  PARÁMETRO:
  data: objeto Date de JavaScript.

  PASO A PASO:
  1. getFullYear() obtiene el año.
  2. getMonth() obtiene el mes, empezando en 0.
     Por eso sumamos 1.
  3. getDate() obtiene el día del mes.
  4. padStart(2, "0") añade un cero a la izquierda
     si el mes o día solo tiene un dígito.

  EJEMPLO:
  5 de noviembre de 2026 -> "2026-11-05".
*/
function aTexto(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}

// Obtenemos la fecha actual y la convertimos a "AAAA-MM-DD".
const hoxe = aTexto(new Date());

// Array reactivo que almacenará todas las citas obtenidas del backend.
const citas = ref([]);

// Fecha seleccionada en la agenda.
// Inicialmente será la fecha de hoy.
const dataEscollida = ref(hoxe);

// Indica si estamos esperando la respuesta del backend.
// Empieza en true porque todavía no hemos cargado las citas.
const cargando = ref(true);

// Almacena un mensaje de error si no podemos obtener las citas.
const errorCarga = ref("");

/*
  FUNCIÓN: sumarDias(data, cantidade)

  OBJETIVO:
  Sumar o restar días a una fecha.

  PARÁMETROS:
  data: fecha en formato "AAAA-MM-DD".
  cantidade: número de días que queremos sumar o restar.

  EJEMPLOS:
  sumarDias("2026-11-18", 1) -> "2026-11-19"
  sumarDias("2026-11-18", -1) -> "2026-11-17"

  PASO A PASO:
  1. Creamos un objeto Date a partir del texto.
  2. Utilizamos las 12:00 para evitar algunos problemas
     relacionados con cambios de horario.
  3. getDate() obtiene el día actual.
  4. setDate() establece el nuevo día.
  5. aTexto() devuelve la fecha con el formato correcto.

  IMPORTANTE:
  setDate() también permite pasar al mes siguiente
  o al anterior automáticamente.
*/
function sumarDias(data, cantidade) {
  const fecha = new Date(`${data}T12:00:00`);
  fecha.setDate(fecha.getDate() + cantidade);
  return aTexto(fecha);
}

/*
  FUNCIÓN: cambiarDia(cantidade)

  OBJETIVO:
  Cambiar la fecha seleccionada al pulsar una flecha.

  EJEMPLO:
  cambiarDia(-1) -> día anterior.
  cambiarDia(1) -> día siguiente.

  Modificamos dataEscollida.value porque es un ref.
  Vue actualiza automáticamente los elementos que
  dependen de esa variable.
*/
function cambiarDia(cantidade) {
  dataEscollida.value = sumarDias(
    dataEscollida.value,
    cantidade
  );
}

/*
  COMPUTED: dias

  OBJETIVO:
  Generar las cinco fechas que aparecen en la agenda.

  PASO A PASO:
  1. Partimos del array [-2, -1, 0, 1, 2].
  2. map() recorre cada número.
  3. sumarDias() calcula la fecha correspondiente.
  4. Obtenemos dos días anteriores, el seleccionado
     y dos días posteriores.

  EJEMPLO:
  Si seleccionamos el día 18, aparecerán:
  16, 17, 18, 19 y 20.

  Es computed porque se recalcula cuando cambia
  dataEscollida.
*/
const dias = computed(() =>
  [-2, -1, 0, 1, 2].map((n) =>
    sumarDias(dataEscollida.value, n)
  )
);

/*
  FUNCIÓN: diaMes(data)

  OBJETIVO:
  Mostrar una fecha con el formato "DD/MM".

  PASO A PASO:
  1. split("-") separa la fecha en año, mes y día.
  2. partes[2] obtiene el día.
  3. partes[1] obtiene el mes.
  4. Devolvemos ambos separados por "/".

  EJEMPLO:
  "2026-11-18" -> "18/11".
*/
function diaMes(data) {
  const partes = data.split("-");
  return `${partes[2]}/${partes[1]}`;
}

/*
  FUNCIÓN: nomeDia(data)

  OBJETIVO:
  Obtener el nombre del día de la semana.

  toLocaleDateString() permite formatear una fecha.

  "gl-ES": utiliza nombres de días en gallego.
  weekday: "long": devuelve el nombre completo.

  EJEMPLO:
  "2026-11-18" -> "mércores".
*/
function nomeDia(data) {
  return new Date(`${data}T12:00:00`).toLocaleDateString(
    "gl-ES",
    { weekday: "long" }
  );
}

/*
  FUNCIÓN: dataCita(cita)

  OBJETIVO:
  Obtener la fecha de una cita como "AAAA-MM-DD".

  PASO A PASO:
  1. Comprobamos si la cita tiene fecha.
  2. Si no tiene, devolvemos una cadena vacía.
  3. String() convierte el valor en texto.
  4. substring(0, 10) obtiene los primeros 10 caracteres.

  Esto permite trabajar con fechas que ya vienen
  como "AAAA-MM-DD" o como texto ISO.

  IMPORTANTE:
  substring(inicio, fin) no incluye la posición fin.
*/
function dataCita(cita) {
  if (!cita.fecha) return "";

  // Admite tanto "AAAA-MM-DD" como una fecha ISO.
  return String(cita.fecha).substring(0, 10);
}

/*
  FUNCIÓN: contarCitas(data)

  OBJETIVO:
  Contar cuántas citas hay en una fecha concreta.

  PASO A PASO:
  1. Accedemos al array citas.value.
  2. filter() recorre todas las citas.
  3. Comprobamos que la fecha coincida.
  4. Excluimos las citas cuyo estado sea "borrada".
  5. length devuelve el número de elementos filtrados.

  EJEMPLO:
  Si hay cuatro citas y una está borrada,
  devuelve 3.

  IMPORTANTE:
  filter() devuelve un array nuevo.
*/
function contarCitas(data) {
  return citas.value.filter(
    (c) =>
      dataCita(c) === data &&
      c.estado !== "borrada"
  ).length;
}

/*
  FUNCIÓN: nomeDoctor(cita)

  OBJETIVO:
  Obtener el nombre completo del doctor de una cita.

  PASO A PASO:
  1. Accedemos a cita.doctorId.
  2. Comprobamos si existe y si es un objeto.
  3. Si no existe, mostramos "(doctor eliminado)".
  4. Concatenamos el nombre y los apellidos.
  5. trim() elimina espacios sobrantes.

  El backend puede devolver doctorId como un objeto
  con los datos del doctor gracias a populate().

  El operador || permite utilizar una cadena vacía
  cuando falta alguno de los campos.
*/
function nomeDoctor(cita) {
  const doctor = cita.doctorId;

  if (!doctor || typeof doctor !== "object") {
    return "(doctor eliminado)";
  }

  return `${doctor.nomedoc || ""} ${doctor.apeldoc || ""}`.trim();
}

/*
  COMPUTED: citasDoDia

  OBJETIVO:
  Obtener las citas de la fecha seleccionada,
  excluyendo las borradas y ordenándolas por hora.

  PASO A PASO:
  1. Partimos del array de todas las citas.
  2. filter() conserva las de la fecha seleccionada.
  3. También excluye las citas borradas.
  4. sort() ordena las citas por hora.
  5. localeCompare() compara las horas como texto.

  EJEMPLO:
  Si tenemos citas a las 12:00, 09:00 y 10:30,
  aparecerán ordenadas:
  09:00, 10:30, 12:00.

  Es computed porque depende de citas y dataEscollida.

  IMPORTANTE:
  El primer filter() devuelve un array nuevo,
  por lo que sort() no modifica el array original
  de citas.
*/
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

/*
  WATCH: dataEscollida

  OBJETIVO:
  Vigilar los cambios en la fecha seleccionada.

  Si el usuario borra la fecha del input,
  volvemos automáticamente a la fecha de hoy.

  watch() recibe:
  1. La variable que queremos observar.
  2. Una función que se ejecuta cuando cambia.

  valor contiene el nuevo valor de dataEscollida.
*/
watch(dataEscollida, (valor) => {
  if (!valor) {
    dataEscollida.value = hoxe;
  }
});

/*
  ONMOUNTED: carga inicial de citas

  OBJETIVO:
  Obtener las citas del backend cuando se monta
  el componente.

  PASO A PASO:
  1. onMounted() se ejecuta al montar el componente.
  2. try intenta realizar la petición.
  3. await getCitas() espera los datos del servidor.
  4. Guardamos las citas en citas.value.
  5. Si ocurre un error, catch lo captura.
  6. finally se ejecuta tanto si hay error como si no.
  7. cargando.value pasa a false para ocultar
     el mensaje de carga.

  IMPORTANTE:
  async permite utilizar await dentro de la función.
*/
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

/*
  FUNCIÓN: exportarCitas()

  OBJETIVO:
  Generar un PDF con las citas del día seleccionado.

  PASO A PASO:
  1. Comprobamos si hay citas.
  2. Si no hay ninguna, terminamos con return.
  3. Definimos los títulos de las columnas.
  4. map() transforma cada cita en un array de valores.
  5. Llamamos a generarPDF().

  generarPDF() recibe:
  - Título del documento.
  - Array de cabeceras.
  - Array de filas.
  - Nombre del archivo PDF.

  EJEMPLO:
  Si seleccionamos el 18 de noviembre de 2026,
  el archivo se llamará axenda_2026-11-18.pdf.
*/
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
