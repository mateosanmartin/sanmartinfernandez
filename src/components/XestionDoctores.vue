<template>
  <!--
    CONTENEDOR PRINCIPAL

    Este div contiene el formulario y la tabla
    de gestión de doctores.

    La clase xestion-doctores aplica los estilos
    CSS definidos en el componente.
  -->
  <div class="xestion-doctores">
    <h4>🩺 Xestión de doctores</h4>

    <!--
      FORMULARIO

      @submit.prevent="guardarDoctor":

      @submit escucha el evento submit.

      .prevent evita el comportamiento
      predeterminado del navegador, que
      normalmente recargaría la página.

      guardarDoctor es la función que crea
      o actualiza un doctor.

      IMPORTANTE:
      Pulsar el botón type="submit"
      ejecuta esta función.
    -->
    <form @submit.prevent="guardarDoctor">
      <!-- PRIMERA FILA: nombre, apellidos y colegiado. -->
      <div class="fila">
        <!-- CAMPO NOMBRE -->
        <div class="campo">
          <label for="nome">Nome:</label>

          <!--
            v-model="novoDoctor.nomedoc":
            Vincula el input con la propiedad
            nomedoc del objeto reactivo novoDoctor.

            Si el usuario escribe, se actualiza
            la propiedad automáticamente.

            Si el script cambia la propiedad,
            también cambia el valor del input.

            type="text":
            Campo de texto.

            required:
            Campo obligatorio.

            @blur="corrixirNome":
            Ejecuta la función corrixirNome
            cuando el input pierde el foco.

            Por ejemplo, al pulsar fuera del campo.
          -->
          <input
            id="nome"
            v-model="novoDoctor.nomedoc"
            type="text"
            required
            @blur="corrixirNome"
          />
        </div>

        <!-- CAMPO APELLIDOS -->
        <div class="campo">
          <label for="apelidos">Apelidos:</label>

          <!--
            Funciona como el campo nombre.

            @blur="corrixirApelido":
            Ejecuta la función que corrige
            el formato de los apellidos cuando
            el usuario abandona el campo.
          -->
          <input
            id="apelidos"
            v-model="novoDoctor.apeldoc"
            type="text"
            required
            @blur="corrixirApelido"
          />
        </div>
        
        <!-- CAMPO ESPECIALIDAD -->
        <div class="campo">
          <label for="especialidade">Especialidade:</label>

          <!--
            SELECT DE ESPECIALIDADES

            v-model="novoDoctor.espedoc":
            Guarda la especialidad seleccionada.

            El array especialidades se carga
            desde la API en el script.

            v-for="especialidade in especialidades":
            Recorre el array de especialidades.

            Por cada objeto genera una opción.

            :key="especialidade.id":
            Identifica de forma única cada opción.

            :value="especialidade.nm":
            Utiliza el nombre de la especialidad
            como valor que se guarda.

            {{ especialidade.nm }}:
            Muestra ese nombre al usuario.
          -->
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

          <!--
            BOTÓN BUSCAR POR ESPECIALIDAD

            type="button":
            No envía el formulario.

            @click="buscarDoctoresPorEspecialidad":
            Ejecuta la función que filtra
            el listado según la especialidad
            seleccionada en el formulario.
          -->
          <button
            type="button"
            class="btn-buscar"
            @click="buscarDoctoresPorEspecialidad"
          >
            🔎
          </button>
        </div>
        
      </div>

      <!-- SEGUNDA FILA: correo, teléfono y especialidad. -->
      <div class="fila">
        <!-- CAMPO CORREO -->
        <div class="campo">
          <label for="correo">Correo:</label>

          <!--
            type="email":
            El navegador comprueba el formato
            básico de una dirección de correo.

            v-model:
            Guarda el correo en novoDoctor.maildoc.

            required:
            Impide enviar el formulario vacío.
          -->
          <input
            id="correo"
            v-model="novoDoctor.maildoc"
            type="email"
            required
          />
        </div>

        <!-- CAMPO TELÉFONO -->
        <div class="campo">
          <label for="telefono">Teléfono:</label>

          <!--
            VALIDACIÓN VISUAL DEL TELÉFONO

            type="tel":
            Campo destinado a números de teléfono.

            maxlength="9":
            Limita la entrada a nueve caracteres.

            v-model="novoDoctor.movildoc":
            Guarda el teléfono introducido.

            :class:
            Añade clases CSS dinámicamente.

            'input-error' se añade cuando
            se cumplen las tres condiciones:

            1. telefonoComprobado es true.
            2. El teléfono no está vacío.
            3. telefonoValido es false.

            && es el operador lógico AND.
            Todas las condiciones deben ser true.

            @blur:
            Cuando el campo pierde el foco,
            activa la comprobación si contiene texto.

            @input:
            Cuando el usuario vuelve a escribir,
            pone telefonoComprobado a false.

            Esto permite retirar temporalmente
            el aviso mientras corrige el número.

            telefonoValido es un computed del script
            que comprueba el formato del teléfono.
          -->
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
          <label for="colexiado">Colexiado:</label>

          <!--
            SELECT CON VALORES BOOLEANOS

            v-model="novoDoctor.coledoc":
            Guarda la opción seleccionada.

            Primera opción:
            value="" -> cadena vacía.

            Segunda opción:
            :value="true" -> booleano true.

            Tercera opción:
            :value="false" -> booleano false.

            MUY IMPORTANTE PARA EL EXAMEN:

            value="false" guardaría el texto "false".

            :value="false" guarda el booleano false.

            Los dos puntos indican que Vue
            evalúa la expresión JavaScript.

            required:
            Obliga a seleccionar una opción válida.
          -->

          <!-- Radio para indicar que SI está colegiado -->
          <label class="radio-opcion">
            <input
              v-model="novoDoctor.coledoc"
              type="radio"
              name="colexiado"
              :value="true"
              required
            />
            Si
          </label>

          <label class="radio-opcion">
            <input
              v-model="novoDoctor.coledoc"
              type="radio"
              name="colexiado"
              :value="false"
              required
            />
            Non
          </label>
        </div>
        <!-- CAMPO COLEGIADO -->
      </div>

      <!--
        CONTENEDOR DE ERRORES

        aria-live="polite":
        Indica a las tecnologías de asistencia
        que deben anunciar los cambios del texto
        sin interrumpir inmediatamente al usuario.

        El contenedor reserva espacio para
        los mensajes de validación.
      -->
      <div class="contenedor-errores" aria-live="polite">
        <!--
          MENSAJE DE VALIDACIÓN

          :class="{ 'error-oculto': !hayErrorValidacion }":

          Añade la clase error-oculto cuando
          NO existe un error de validación.

          ! es el operador lógico NOT.

          {{ mensajeValidacion }}:
          Muestra el texto calculado en el script.

          En tu código, el mensaje aparece
          cuando el teléfono introducido
          no cumple el formato esperado.
        -->
        <p
          class="mensaje-error"
          :class="{ 'error-oculto': !hayErrorValidacion }"
        >
          {{ mensajeValidacion }}
        </p>
      </div>

      <!-- BOTONES DEL FORMULARIO -->
      <div class="botones-formulario">
        <!--
          BOTÓN GUARDAR / ACTUALIZAR

          type="submit":
          Envía el formulario y activa guardarDoctor.

          :disabled:
          Deshabilita el botón si alguna de
          las condiciones es verdadera.

          || es el operador lógico OR.

          Las condiciones comprueban:

          - Nombre vacío.
          - Apellidos vacíos.
          - Correo vacío.
          - Teléfono no válido.
          - Colegiado sin seleccionar.
          - Especialidad sin seleccionar.

          trim():
          Elimina espacios al principio y al final.

          EXPRESIÓN TERNARIA:

          editando ? "Actualizar" : "Gardar"

          Si editando es true, muestra Actualizar.
          Si editando es false, muestra Gardar.

          El mismo botón sirve para crear
          y actualizar doctores.
        -->
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

        <!--
          BOTÓN LIMPIAR / CANCELAR

          type="button":
          No envía el formulario.

          @click="limpiaFormdoc":
          Ejecuta la función que limpia
          el formulario y reinicia la edición.

          La expresión ternaria cambia el texto
          dependiendo del modo actual.

          Si estamos editando -> Cancelar.
          Si no estamos editando -> 🧹.
        -->
        <button type="button" class="btn-limpiar" @click="limpiaFormdoc">
          {{ editando ? "Cancelar" : "🧹" }}
        </button>
      </div>
    </form>

    <!--
      CABECERA DEL LISTADO

      Muestra el título de la tabla y
      el botón de exportación a PDF.
    -->
    <h4 class="titulo-listado">
      📋 Listaxe de doctores

      <!--
        EXPORTAR PDF

        @click="exportarDoctores":
        Ejecuta la función que genera el PDF.

        :disabled="doctores.length === 0":
        Deshabilita el botón cuando el array
        de doctores está vacío.
      -->
      <button
        type="button"
        class="btn-pdf"
        @click="exportarDoctores"
        :disabled="doctores.length === 0"
      >
        🖨️
      </button>
    </h4>

    <!--
      TABLA CONDICIONAL

      v-if="doctores.length > 0":
      Muestra la tabla si existe al menos
      un doctor en el array.

      Si está vacío, se ejecuta el v-else
      situado después de este div.
    -->
    <div class="tabla-contenedor" v-if="doctores.length > 0">
      <table class="tabla-doctores">
        <!--
          COLGROUP

          Agrupa las columnas de una tabla
          para poder aplicarles estilos CSS.

          Cada <col> corresponde a una columna.

          No genera filas ni datos nuevos.
        -->
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

        <!--
          THEAD

          Contiene las cabeceras de la tabla.

          tr = fila.
          th = celda de cabecera.
        -->
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

        <!--
          TBODY

          Contiene las filas con los datos
          de los doctores recuperados de la API.
        -->
        <tbody>
          <!--
            DIRECTIVA v-for

            v-for="(u, index) in doctores":

            u:
            Objeto del doctor actual.

            index:
            Posición del doctor en el array,
            empezando en 0.

            :key="u._id || index":

            Si u._id tiene un valor truthy,
            se utiliza como clave.

            En caso contrario, se utiliza index.

            _id es el identificador generado
            por MongoDB.

            El operador || devuelve el primer
            operando truthy, o el último
            si ninguno lo es.
          -->
          <tr v-for="(u, index) in doctores" :key="u._id || index">
            <!--
              NÚMERO DE FILA

              index empieza en 0.

              index + 1 permite mostrar:
              1, 2, 3, 4...

              No modifica el array original.
            -->
            <td>{{ index + 1 }}</td>

            <!-- Apellidos del doctor. -->
            <td>{{ u.apeldoc }}</td>

            <!-- Nombre del doctor. -->
            <td>{{ u.nomedoc }}</td>

            <!-- Teléfono del doctor. -->
            <td>{{ u.movildoc }}</td>

            <!-- Correo del doctor. -->
            <td>{{ u.maildoc }}</td>

            <!-- Especialidad del doctor. -->
            <td>{{ u.espedoc }}</td>

            <!--
              COLEGIADO

              Utiliza una expresión ternaria.

              Si u.coledoc es true -> "Si".
              Si u.coledoc es false -> "Non".

              Así mostramos un texto legible
              en lugar de true o false.
            -->
            <td>{{ u.coledoc ? "Si" : "Non" }}</td>

            <!--
              COLUMNA DE ACCIONES

              Contiene los botones para editar
              y eliminar el doctor actual.
            -->
            <td class="acciones">
              <!--
                EDITAR DOCTOR

                @click="editarDoctor(index)":
                Pasa la posición del doctor
                a la función editarDoctor.

                La función utiliza ese índice
                para recuperar el objeto
                del array y rellenar el formulario.

                title="Editar":
                Texto descriptivo del botón.
              -->
              <button type="button" @click="editarDoctor(index)" title="Editar">
                ✏️
              </button>

              <!--
                ELIMINAR DOCTOR

                @click="eliminarDoctor(index)":
                Pasa la posición del doctor
                a la función de eliminación.

                La función del script se encarga
                de gestionar la confirmación
                y la petición correspondiente.
              -->
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

    <!--
      v-else

      Se muestra únicamente cuando
      doctores.length > 0 es falso.

      Es decir, cuando no hay doctores
      en el array que se está mostrando.
    -->
    <p v-else>Non hai doctores cargados.</p>
  </div>
</template>

<script setup>
/*
  IMPORTACIONES DE VUE

  ref:
  Crea variables reactivas. Para acceder a su valor
  desde JavaScript necesitamos utilizar .value.

  reactive:
  Crea objetos reactivos cuyas propiedades se pueden
  modificar directamente, sin utilizar .value.

  computed:
  Crea valores calculados que se actualizan
  automáticamente cuando cambian sus dependencias.

  onMounted:
  Ejecuta una función cuando el componente
  se ha montado en la página.
*/
import { ref, reactive, computed, onMounted } from "vue";

/*
  FUNCIÓN DE LA API

  obtenerEspecialidades:
  Obtiene las especialidades médicas del backend
  para mostrarlas en el formulario y en los filtros.
*/
import { obtenerEspecialidades } from "../api/especialidades.js";

/*
  FUNCIONES CRUD DE DOCTORES

  saveDoctor: crea un doctor.
  getDoctores: obtiene todos los doctores.
  getDoctorByEspecialidad: obtiene doctores de una especialidad.
  modifyDoctor: actualiza un doctor existente.
  deleteDoctor: elimina un doctor.
*/
import {
  saveDoctor,
  getDoctores,
  getDoctorByEspecialidad,
  modifyDoctor,
  deleteDoctor,
} from "../api/doctores.js";

/*
  FUNCIONES DE ALERTAS

  alertaExito: informa de una operación correcta.
  alertaError: informa de un error.
  alertaConfirmacion: pregunta antes de actualizar o eliminar.
*/
import {
  alertaExito,
  alertaError,
  alertaConfirmacion,
} from "../utils/alertas.js";

// Utilidad para generar documentos PDF.
import { generarPDF } from "../utils/pdf.js";

// Store de Pinia para compartir el doctor seleccionado.
import { useDoctorStore } from "../store/doctorStore.js";

/*
  Obtenemos una instancia del store de doctores.

  Esto permite seleccionar un doctor y utilizar
  sus datos desde otros componentes, como XestionCitas.
*/
const doctorStore = useDoctorStore();

// LISTAS

/*
  doctores:
  Array reactivo con los doctores que mostramos en la tabla.

  especialidades:
  Array reactivo con las especialidades disponibles.

  Inicialmente ambos arrays están vacíos.
*/
const doctores = ref([]);
const especialidades = ref([]);

// CONTROL DE EDICIÓN Y FILTRO

/*
  editando:
  false -> estamos creando un doctor.
  true -> estamos modificando uno existente.

  idDoctorEditar:
  Guarda el _id del doctor que estamos editando.
  null significa que no estamos editando ninguno.

  filtroEspecialidad:
  Guarda la especialidad elegida en el filtro.
  Una cadena vacía significa que mostramos todas.

  telefonoComprobado:
  Controla cuándo mostramos los mensajes
  de validación del teléfono.
*/
const editando = ref(false);
const idDoctorEditar = ref(null);
const filtroEspecialidad = ref("");
const telefonoComprobado = ref(false);

// FORMULARIO

/*
  OBJETO REACTIVO: novoDoctor

  Guarda los datos del formulario.

  nomedoc: nombre del doctor.
  apeldoc: apellidos.
  maildoc: correo electrónico.
  movildoc: teléfono móvil.
  coledoc: situación de colegiación.
  espedoc: especialidad médica.

  reactive hace que Vue detecte los cambios
  realizados en cualquiera de estas propiedades.

  EJEMPLO:
  novoDoctor.nomedoc = "Ana";

  No necesitamos utilizar novoDoctor.value.
*/
const novoDoctor = reactive({
  nomedoc: "",
  apeldoc: "",
  maildoc: "",
  movildoc: "",
  coledoc: "",
  espedoc: "",
});

// VALIDAR TELÉFONO

/*
  COMPUTED: telefonoValido

  OBJETIVO:
  Comprobar si el teléfono introducido es válido.

  PASO A PASO:

  1. Obtenemos novoDoctor.movildoc.
  2. trim() elimina los espacios del principio y del final.
  3. Utilizamos una expresión regular para comprobarlo.
  4. test() devuelve true o false.

  EXPRESIÓN REGULAR:
  /^[67]\d{8}$/

  ^       Inicio del texto.
  [67]    Debe empezar por 6 o por 7.
  \d{8}   Después debe tener ocho dígitos.
  $       Final del texto.

  Por tanto, el teléfono debe tener nueve dígitos.

  EJEMPLOS:
  612345678 -> true.
  712345678 -> true.
  512345678 -> false.
  61234567  -> false.

  Es computed porque depende de novoDoctor.movildoc.
*/
const telefonoValido = computed(() => {
  const telefono = novoDoctor.movildoc.trim();
  return /^[67]\d{8}$/.test(telefono);
});

/*
  COMPUTED: mensajeValidacion

  OBJETIVO:
  Determinar si debemos mostrar un mensaje de error.

  COMPROBACIONES:

  telefonoComprobado.value:
  Indica si debemos mostrar el resultado de la validación.

  novoDoctor.movildoc.trim() !== "":
  Comprueba que el teléfono no esté vacío.

  !telefonoValido.value:
  Comprueba que el teléfono NO sea válido.

  OPERADORES:

  && significa Y: todas las condiciones deben cumplirse.

  ! significa negación:
  !true es false y !false es true.

  Si las condiciones se cumplen, devolvemos
  el mensaje de error.

  Si no, devolvemos una cadena vacía.
*/
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

/*
  COMPUTED: hayErrorValidacion

  OBJETIVO:
  Saber si existe algún mensaje de error.

  Si mensajeValidacion es distinto de "",
  devuelve true.

  Si está vacío, devuelve false.

  !== es una comparación estricta de desigualdad.
*/
const hayErrorValidacion = computed(() => mensajeValidacion.value !== "");

// CARGAR DATOS AL ENTRAR

/*
  ONMOUNTED: CARGA INICIAL

  OBJETIVO:
  Obtener las especialidades y los doctores
  cuando abrimos este componente.

  PASO A PASO:

  1. onMounted ejecuta la función al montar el componente.
  2. try intenta realizar las operaciones.
  3. await obtenerEspecialidades() espera los datos.
  4. Guardamos el resultado en especialidades.value.
  5. await cargarDoctores() carga los doctores.
  6. Si ocurre un error, catch lo captura.
  7. Mostramos el error por consola y una alerta.

  IMPORTANTE:
  async permite utilizar await dentro de la función.
*/
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

/*
  FUNCIÓN: cargarDoctores()

  OBJETIVO:
  Obtener todos los doctores desde el backend.

  PASO A PASO:

  1. Llamamos a getDoctores().
  2. await espera la respuesta del servidor.
  3. Guardamos el array recibido en doctores.value.
  4. Vue actualiza automáticamente la tabla.
  5. Si falla la petición, mostramos un error.

  IMPORTANTE:
  getDoctores() es una función de src/api/doctores.js.
*/
async function cargarDoctores() {
  try {
    doctores.value = await getDoctores();
  } catch (error) {
    console.error("Error al obtener doctores:", error);
    alertaError("Error al obtener los doctores.");
  }
}

// FILTRAR DOCTORES POR ESPECIALIDAD

/*
  FUNCIÓN: filtrarDoctores()

  OBJETIVO:
  Mostrar los doctores de una especialidad concreta
  o todos los doctores si no hay filtro.

  PASO A PASO:

  1. Comprobamos filtroEspecialidad.value.

  2. Si es una cadena vacía:
     llamamos a getDoctores() para obtener todos.

  3. Si tiene una especialidad:
     llamamos a getDoctorByEspecialidad()
     pasando la especialidad seleccionada.

  4. Guardamos el resultado en doctores.value.

  5. Si ocurre un error, lo capturamos con catch.

  IMPORTANTE:
  El filtro se realiza mediante una petición al backend,
  no mediante filter() en el navegador.
*/
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

/*
  FUNCIÓN: buscarDoctoresPorEspecialidad()

  OBJETIVO:
  Buscar doctores utilizando la especialidad
  seleccionada en el formulario.

  PASO A PASO:

  1. Copiamos novoDoctor.espedoc al filtro.
  2. Llamamos a filtrarDoctores().
  3. await espera a que termine la búsqueda.

  EJEMPLO:
  Si novoDoctor.espedoc es "Pediatría",
  se mostrarán los doctores de Pediatría.
*/
async function buscarDoctoresPorEspecialidad() {
  filtroEspecialidad.value = novoDoctor.espedoc;
  await filtrarDoctores();
}

// GUARDAR O ACTUALIZAR DOCTOR

/*
  FUNCIÓN: guardarDoctor()

  OBJETIVO:
  Crear un doctor nuevo o actualizar uno existente.

  PASO 1: VALIDAR EL TELÉFONO

  Si telefonoValido.value es false,
  terminamos la función con return.

  PASO 2: PREPARAR LOS DATOS

  Creamos doctorParaGuardar con los campos
  que queremos enviar al backend.

  trim() elimina espacios sobrantes del nombre,
  apellidos, correo y teléfono.

  PASO 3: COMPROBAR EL MODO EDICIÓN

  Si editando.value es true:
  - Pedimos confirmación.
  - Si el usuario cancela, terminamos.
  - Llamamos a modifyDoctor() con el _id.
  - Actualizamos el doctor seleccionado en Pinia.
  - Mostramos una alerta de éxito.

  Si editando.value es false:
  - Llamamos a saveDoctor().
  - Mostramos una alerta de éxito.

  PASO 4: ACTUALIZAR LA INTERFAZ

  limpiaFormdoc() restablece el formulario.
  filtrarDoctores() actualiza la tabla.

  PASO 5: GESTIONAR ERRORES

  catch captura los errores producidos
  dentro del bloque try.

  IMPORTANTE:
  El operador spread (...doctorParaGuardar)
  copia las propiedades de ese objeto dentro
  del nuevo objeto enviado al store.
*/
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
      doctorStore.seleccionarDoctor({
        _id: idDoctorEditar.value,
        ...doctorParaGuardar,
      });

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

/*
  FUNCIÓN: editarDoctor(index)

  OBJETIVO:
  Cargar los datos de un doctor existente
  en el formulario para poder modificarlos.

  PARÁMETRO:
  index: posición del doctor dentro del array doctores.

  PASO A PASO:

  1. Obtenemos el doctor utilizando su índice.

  2. Object.assign() copia las propiedades
     indicadas al objeto reactivo novoDoctor.

  3. Guardamos el _id del doctor que editamos.

  4. Guardamos el doctor en Pinia.

  5. editando.value = true activa el modo edición.

  6. telefonoComprobado.value = true activa
     la visualización de la validación del teléfono.

  7. window.scrollTo() desplaza la página
     al principio para mostrar el formulario.

  IMPORTANTE:
  Object.assign() modifica el objeto original.
  No sustituye el objeto reactive por otro.
*/
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

/*
  FUNCIÓN: eliminarDoctor(index)

  OBJETIVO:
  Eliminar un doctor después de pedir confirmación.

  PARÁMETRO:
  index: posición del doctor dentro del array.

  PASO A PASO:

  1. Pedimos confirmación al usuario.

  2. Si confirma, obtenemos el doctor
     mediante doctores.value[index].

  3. Llamamos a deleteDoctor() pasando su _id.

  4. Si el doctor eliminado coincide con el
     seleccionado en Pinia, limpiamos el store.

  5. Mostramos una alerta de éxito.

  6. Si estábamos editando ese mismo doctor,
     limpiamos el formulario.

  7. Volvemos a cargar la tabla aplicando
     el filtro de especialidad actual.

  8. Si ocurre un error, catch lo captura
     y mostramos una alerta.

  IMPORTANTE:
  El doctor se elimina del backend.
  Después se vuelve a consultar la lista,
  en lugar de utilizar splice() directamente.
*/
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

/*
  FUNCIÓN: limpiaFormdoc()

  OBJETIVO:
  Dejar el formulario preparado para crear
  un doctor nuevo.

  PASO A PASO:

  1. Object.assign() restablece todos los
     campos de novoDoctor.

  2. editando.value = false desactiva la edición.

  3. idDoctorEditar.value = null elimina
     el identificador del doctor en edición.

  4. telefonoComprobado.value = false
     reinicia el indicador de validación.

  IMPORTANTE:
  Object.assign() conserva la reactividad
  del objeto novoDoctor.
*/
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

/*
  FUNCIÓN: corrixirNome()

  OBJETIVO:
  Formatear el nombre del doctor para que
  cada palabra empiece por mayúscula
  y continúe en minúsculas.

  PASO A PASO:

  1. Comprobamos que el nombre tenga caracteres.

  2. trim() elimina espacios al principio y al final.

  3. split(/\s+/) divide el texto en palabras.
     \s representa un espacio en blanco.
     + significa uno o más.

  4. map() recorre cada palabra.

  5. charAt(0) obtiene su primera letra.

  6. toUpperCase() convierte esa letra en mayúscula.

  7. slice(1) obtiene el resto de la palabra.

  8. toLowerCase() convierte el resto en minúsculas.

  9. join(" ") une las palabras con un espacio.

  EJEMPLO:
  "  juAN   carLOS " -> "Juan Carlos".

  IMPORTANTE:
  map() devuelve un array nuevo.
*/
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

/*
  FUNCIÓN: corrixirApelido()

  OBJETIVO:
  Formatear los apellidos del doctor.

  FUNCIONA IGUAL QUE corrixirNome():

  1. Elimina espacios sobrantes.
  2. Divide los apellidos en palabras.
  3. Convierte la primera letra de cada palabra
     en mayúscula.
  4. Convierte el resto de letras en minúsculas.
  5. Une las palabras mediante espacios.

  EJEMPLO:
  "  garCÍA   lÓPEZ " -> "García López".

  IMPORTANTE:
  No elimina tildes.
  Solo modifica las mayúsculas y minúsculas.
*/
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

/*
  FUNCIÓN: exportarDoctores()

  OBJETIVO:
  Generar un PDF con el listado de doctores.

  generarPDF() recibe cuatro argumentos:

  1. Título del documento.
  2. Array con las cabeceras.
  3. Array con las filas de datos.
  4. Nombre del archivo PDF.

  PASO A PASO:

  1. Definimos el título "Listado de doctores".

  2. Definimos las columnas:
     número, apellidos, nombre, móvil,
     correo, especialidad y colegiado.

  3. map() recorre el array doctores.value.

  4. Por cada doctor, devuelve un array
     con los datos de una fila.

  5. index + 1 genera la numeración
     comenzando en 1 en lugar de 0.

  6. El operador ternario:
     doctor.coledoc ? "Si" : "Non"

     Devuelve "Si" si coledoc es verdadero.
     Devuelve "Non" si es falso.

  7. generarPDF() crea el documento
     listado_doctores.pdf.

  IMPORTANTE:
  Se exportan los doctores que estén actualmente
  en doctores.value. Si hay un filtro aplicado,
  se exportan los resultados de ese filtro.
*/
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


.label-colexiado {
  min-width: 80px;
  font-size: 0.9rem;
  font-weight: 600;
}

.radio-group {
  display: flex;
  align-items: center;
  gap: 15px;
}

.campo .radio-opcion {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-left: 15px;
  min-width: 0;
  width: auto;
  cursor: pointer;
}

.campo .radio-opcion input[type="radio"] {
  flex: 0 0 14px;
  width: 14px;
  height: 14px;
  min-width: 14px;
  min-height: 14px;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  appearance: auto;
  accent-color: #348358;
}

</style>
