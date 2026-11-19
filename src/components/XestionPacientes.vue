
<template>
  <!--
    CONTENEDOR PRINCIPAL

    Agrupa el formulario de pacientes
    y la tabla con los pacientes registrados.
  -->
  <div class="xestion-pacientes">
    <h4>👥 Xestión de pacientes</h4>

    <!--
      FORMULARIO

      @submit.prevent="guardarPaciente":

      @submit escucha el envío del formulario.

      .prevent evita que el navegador
      recargue la página.

      guardarPaciente es la función del script
      que decide si crear o actualizar
      un paciente.

      La función se ejecuta cuando se envía
      el formulario mediante el botón submit.
    -->
    <form @submit.prevent="guardarPaciente">

      <!-- PRIMERA FILA: DNI, nombre y apellidos. -->
      <div class="fila">

        <!-- CAMPO DNI -->
        <div class="campo campo-dni">
          <label for="dni">DNI/CIF:</label>

          <!--
            INPUT DNI/NIE

            v-model="novoPaciente.dnipac":
            Vincula el campo con la propiedad
            dnipac del objeto reactivo.

            required:
            Campo obligatorio.

            maxlength="9":
            Limita el número de caracteres.

            style="text-align: center":
            Centra el texto dentro del input.

            :class:
            Añade clases CSS dinámicamente.

            CLASE dni-valido:

            Se aplica cuando:
            - Ya se ha comprobado el DNI.
            - El campo no está vacío.
            - El DNI es válido.

            CLASE input-error:

            Se aplica cuando:
            - Ya se ha comprobado el DNI.
            - El campo no está vacío.
            - El DNI NO es válido.

            @input:

            Se ejecuta cada vez que el usuario
            introduce o modifica texto.

            toUpperCase():
            Convierte las letras a mayúsculas.

            dniComprobado = false:
            Reinicia el estado de comprobación
            mientras el usuario escribe.

            @blur="dniComprobado = true":

            Cuando el input pierde el foco,
            activa la comprobación visual.

            IMPORTANTE:
            dniValido es un computed del script
            que comprueba la estructura y
            la letra de control del DNI/NIE.
          -->
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

          <!--
            BOTÓN BUSCAR PACIENTE

            type="button":
            Evita enviar el formulario.

            @click="buscarPaciente":
            Ejecuta la función que busca
            un paciente utilizando el DNI
            introducido en el formulario.
          -->
          <button type="button" class="btn-buscar" @click="buscarPaciente">
            🔎
          </button>
        </div>

        <!-- CAMPO NOMBRE -->
        <div class="campo campo-nome">
          <label for="nome">Nome:</label>

          <!--
            v-model="novoPaciente.nomepac":
            Vinculación bidireccional del nombre.

            required:
            Campo obligatorio.
          -->
          <input
            id="nome"
            v-model="novoPaciente.nomepac"
            type="text"
            required
          />
        </div>

        <!-- CAMPO APELLIDOS -->
        <div class="campo campo-apelidos">
          <label for="apelidos">Apelidos:</label>

          <!--
            Guarda los apellidos en
            novoPaciente.apelpac.

            required:
            Campo obligatorio.
          -->
          <input
            id="apelidos"
            v-model="novoPaciente.apelpac"
            type="text"
            required
          />
        </div>
      </div>

      <!-- SEGUNDA FILA: fecha, correo y teléfono. -->
      <div class="fila">

        <!-- FECHA DE NACIMIENTO -->
        <div class="campo campo-fechanacimiento">
          <label for="fechaNacimiento">Fecha Nacimiento:</label>

          <!--
            type="date":
            Muestra un selector de fecha.

            v-model="novoPaciente.nacipac":
            Guarda la fecha de nacimiento.

            Normalmente el valor se representa
            mediante el formato YYYY-MM-DD.

            required:
            Campo obligatorio.
          -->
          <input
            id="fechaNacimiento"
            v-model="novoPaciente.nacipac"
            type="date"
            required
          />
        </div>

        <!-- CORREO ELECTRÓNICO -->
        <div class="campo campo-correo">
          <label for="correo">Correo:</label>

          <!--
            type="email":
            Activa la validación básica
            de correo electrónico del navegador.

            v-model:
            Guarda el correo del paciente.

            required:
            En este formulario, el correo
            es obligatorio.
          -->
          <input
            id="correo"
            v-model="novoPaciente.mailpac"
            type="email"
            required
          />
        </div>

        <!-- TELÉFONO -->
        <div class="campo campo-telefono">
          <label for="telefono">Teléfono:</label>

          <!--
            INPUT TELÉFONO

            v-model="novoPaciente.movilpac":
            Guarda el teléfono introducido.

            type="tel":
            Campo de teléfono.

            maxlength="9":
            Máximo de nueve caracteres.

            :class:
            Aplica clases de validación.

            dni-valido:
            Se añade cuando el teléfono
            ha sido comprobado y es válido.

            input-error:
            Se añade cuando el teléfono
            ha sido comprobado y no es válido.

            @input="telefonoComprobado = false":
            Reinicia el estado de comprobación
            mientras el usuario escribe.

            @blur:
            Activa la comprobación cuando
            el campo pierde el foco, siempre
            que contenga algún texto.

            telefonoValido:
            Propiedad computed del script.

            Comprueba que el teléfono tenga
            nueve dígitos y empiece por 6 o 7.

            ATENCIÓN:
            Aunque este input no tiene required,
            el botón Guardar sí exige
            que telefonoValido sea true.
          -->
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

      <!-- TERCERA FILA: dirección, provincia y municipio. -->
      <div class="fila">

        <!-- DIRECCIÓN -->
        <div class="campo campo-direccion">
          <label for="direccion">Dirección:</label>

          <!--
            Campo de dirección.

            No tiene el atributo required,
            por lo que puede quedar vacío.

            Su contenido se guarda en dirpac.
          -->
          <input id="direccion" v-model="novoPaciente.dirpac" type="text" />
        </div>

        <!-- PROVINCIA -->
        <div class="campo campo-provincia">
          <label for="provincia">Provincia:</label>

          <!--
            SELECT DE PROVINCIAS

            v-model="novoPaciente.propac":
            Guarda el nombre de la provincia.

            @change:
            Se ejecuta cuando cambia
            la opción seleccionada.

            Realiza dos operaciones:

            1. novoPaciente.munipac = ''
               Limpia el municipio anterior.

            2. cargarMunicipios()
               Ejecuta la función que obtiene
               los municipios correspondientes
               a la provincia seleccionada.

            ¿POR QUÉ LIMPIAMOS EL MUNICIPIO?

            Porque al cambiar de provincia,
            el municipio anterior podría
            pertenecer a otra provincia.

            required:
            Obliga a seleccionar una provincia.
          -->
          <select
            id="provincia"
            v-model="novoPaciente.propac"
            @change="novoPaciente.munipac = ''; cargarMunicipios()"
            required
          >
            <!-- Opción inicial con valor vacío. -->
            <option value="">Seleccionar</option>

            <!--
              v-for="provincia in provincias":
              Recorre el array provincias.

              :key="provincia.id":
              Identifica cada opción.

              :value="provincia.nm":
              Guarda el nombre de la provincia.

              {{ provincia.nm }}:
              Muestra el nombre al usuario.

              provincias es un ref que se carga
              mediante obtenerProvincias().
            -->
            <option
              v-for="provincia in provincias"
              :key="provincia.id"
              :value="provincia.nm"
            >
              {{ provincia.nm }}
            </option>
          </select>
        </div>

        <!-- MUNICIPIO -->
        <div class="campo campo-municipio">
          <label for="municipio">Municipio:</label>

          <!--
            SELECT DE MUNICIPIOS

            v-model="novoPaciente.munipac":
            Guarda el municipio seleccionado.

            :disabled="!novoPaciente.propac":

            Si no hay provincia seleccionada,
            el desplegable está deshabilitado.

            ! es el operador lógico NOT.

            EJEMPLO:

            propac = "":
            !propac es true.
            El select queda deshabilitado.

            propac = "Pontevedra":
            !propac es false.
            El select queda habilitado.

            Los municipios se obtienen mediante
            la función cargarMunicipios().
          -->
          <select
            id="municipio"
            v-model="novoPaciente.munipac"
            :disabled="!novoPaciente.propac"
          >
            <option value="">Seleccionar</option>

            <!--
              BUCLE DE MUNICIPIOS

              v-for recorre el array municipios.

              Cada opción utiliza:
              - municipio.id como clave.
              - municipio.nm como valor.
              - municipio.nm como texto visible.
            -->
            <option
              v-for="municipio in municipios"
              :key="municipio.id"
              :value="municipio.nm"
            >
              {{ municipio.nm }}
            </option>
          </select>
        </div>
      </div>

      <!--
        POLÍTICA DE PRIVACIDAD

        Contiene un checkbox y un enlace
        a la política de privacidad.
      -->
      <div class="campo-politica">

        <!--
          CHECKBOX

          type="checkbox":
          Representa una casilla de verificación.

          v-model="novoPaciente.lodpac":
          Vincula la casilla con un booleano.

          Marcada:
          lodpac = true.

          Desmarcada:
          lodpac = false.

          required:
          Obliga a marcar la casilla para
          enviar el formulario.

          IMPORTANTE:
          Este campo también participa
          en la condición :disabled
          del botón Guardar.
        -->
        <input
          id="lodpac"
          v-model="novoPaciente.lodpac"
          type="checkbox"
          required
        />

        <label for="lodpac">
          Aceptar la

          <!--
            ROUTER-LINK

            Componente de Vue Router.

            to="/politicaprivacidad":
            Navega a la política de privacidad.

            target="_blank":
            Abre el enlace en una nueva pestaña.

            class="link-politica":
            Aplica estilos CSS.

            required:
            Este atributo está presente
            en el código original del enlace.

            No es el atributo que valida
            la aceptación: esa función
            corresponde al checkbox.
          -->
          <router-link
            class="link-politica"
            to="/politicaprivacidad"
            target="_blank"
            required
            >política de privacidad</router-link
          >
        </label>
      </div>

      <!--
        CONTENEDOR DE ERRORES

        Reserva una línea para mostrar
        los mensajes de validación.

        aria-live="polite":
        Permite anunciar los cambios
        a tecnologías de asistencia.
      -->

      <!-- Una única línea reservada para errores: no desplaza el formulario -->
      <div class="contenedor-errores" aria-live="polite">

        <!--
          MENSAJE DE VALIDACIÓN

          :class:
          Añade la clase error-oculto
          cuando hayErrorValidacion es false.

          {{ mensajeValidacion }}:
          Muestra el mensaje calculado
          en el script.

          Puede indicar:
          - DNI incorrecto.
          - Teléfono incorrecto.

          La lógica del script decide
          qué mensaje mostrar.
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
          Activa el evento submit del formulario.

          :disabled:
          Deshabilita el botón si se cumple
          alguna de las condiciones.

          || es el operador lógico OR.

          CONDICIONES:

          1. DNI vacío.
          2. Nombre vacío.
          3. DNI no válido.
          4. Teléfono no válido.
          5. Provincia sin seleccionar.
          6. Política de privacidad no aceptada.

          Si alguna es verdadera,
          el botón permanece deshabilitado.

          EXPRESIÓN TERNARIA:

          editandoIndex !== null
            ? "Actualizar"
            : "Gardar"

          Si editandoIndex tiene un índice,
          estamos editando un paciente.

          Si vale null, estamos creando uno.

          IMPORTANTE:
          El índice 0 también representa
          un paciente válido.

          Por eso se compara con null
          en lugar de utilizar simplemente
          editandoIndex como condición.
        -->
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

        <!--
          BOTÓN LIMPIAR / CANCELAR

          type="button":
          No envía el formulario.

          @click="limpiarFormulario":
          Ejecuta la función que limpia
          los campos del formulario.

          La expresión ternaria muestra:

          "Cancelar" cuando estamos editando.

          "🧹" cuando no estamos editando.
        -->
        <button type="button" class="btn-limpiar" @click="limpiarFormulario">
          {{ editandoIndex !== null ? "Cancelar" : "🧹" }}
        </button>
      </div>
    </form>

    <!--
      CABECERA DEL LISTADO

      Contiene el título de la tabla
      y el botón para exportar pacientes.
    -->
    <h4 class="titulo-listado">
      📋 Listaxe de pacientes

      <!--
        BOTÓN EXPORTAR PDF

        @click="exportarPacientes":
        Ejecuta la función que genera
        el documento PDF.

        :disabled="pacientes.length === 0":
        Deshabilita el botón cuando
        no hay pacientes en el array.
      -->
      <button
        type="button"
        class="btn-pdf"
        @click="exportarPacientes"
        :disabled="pacientes.length === 0"
      >
        🖨️
      </button>
    </h4>

    <!--
      TABLA DE PACIENTES

      v-if="pacientes.length > 0":
      Muestra la tabla si el array
      contiene al menos un paciente.

      Si está vacío, se muestra el v-else
      situado después de este div.
    -->
    <div class="tabla-contenedor" v-if="pacientes.length > 0">
      <table class="tabla-pacientes">

        <!--
          COLGROUP

          Permite aplicar estilos CSS
          a las columnas de la tabla.

          Cada col representa una columna.
        -->
        <colgroup>
          <col class="col-numero" />
          <col class="col-dni" />
          <col class="col-nome" />
          <col class="col-correo" />
          <col class="col-provincia" />
          <col class="col-accions" />
        </colgroup>

        <!--
          THEAD

          Contiene la cabecera de la tabla.

          tr representa una fila.
          th representa una celda de cabecera.
        -->
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

        <!--
          TBODY

          Contiene las filas con los datos
          de los pacientes.
        -->
        <tbody>

          <!--
            DIRECTIVA v-for

            v-for="(u, index) in pacientes":

            u:
            Objeto del paciente actual.

            index:
            Posición del paciente en el array.

            Empieza en 0.

            :key="u._id || index":

            Utiliza el identificador de MongoDB
            cuando está disponible.

            Si no existe un _id truthy,
            utiliza el índice como alternativa.

            Vue utiliza las claves para
            identificar las filas al actualizar
            el listado.
          -->
          <tr v-for="(u, index) in pacientes" :key="u._id || index">

            <!--
              NÚMERO DE FILA

              index + 1:
              Convierte la posición del array
              en una numeración desde 1.

              EJEMPLO:
              index = 0 -> muestra 1.
              index = 1 -> muestra 2.
            -->
            <td>
              {{ index + 1 }}
            </td>

            <!-- DNI del paciente. -->
            <td class="dni-tabla">{{ u.dnipac }}</td>

            <!-- Nombre del paciente. -->
            <td>{{ u.nomepac }}</td>

            <!-- Correo del paciente. -->
            <td>{{ u.mailpac }}</td>

            <!--
              NOMBRE DE PROVINCIA

              nombreProvincia(u.propac):
              Llama a una función del script
              pasando la provincia del paciente.

              La función busca su nombre
              en el array de provincias.

              El resultado se muestra
              mediante interpolación.
            -->
            <td>{{ nombreProvincia(u.propac) }}</td>

            <!--
              ACCIONES DEL PACIENTE

              Contiene los botones para editar
              y eliminar el paciente de esta fila.
            -->
            <td class="acciones">

              <!--
                EDITAR PACIENTE

                @click="editarPaciente(index)":
                Pasa la posición del paciente
                a la función editarPaciente.

                Esa función obtiene los datos
                del paciente y prepara
                el formulario para editarlo.

                title="Editar":
                Texto descriptivo del botón.
              -->
              <button
                type="button"
                @click="editarPaciente(index)"
                title="Editar"
              >
                ✏️
              </button>

              <!--
                ELIMINAR PACIENTE

                @click="eliminarPaciente(index)":
                Pasa la posición del paciente
                a la función eliminarPaciente.

                La función del script gestiona
                la confirmación y la eliminación.

                type="button":
                Evita enviar un formulario.
              -->
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

    <!--
      MENSAJE SIN PACIENTES

      v-else:
      Se ejecuta cuando la condición
      del v-if anterior es falsa.

      En este caso, cuando el array
      pacientes está vacío.
    -->
    <p v-else>Non hai pacientes cargados.</p>
  </div>
</template>

<script setup>
/*
  IMPORTACIONES DE VUE

  ref:
  Crea variables reactivas. En JavaScript accedemos
  a su contenido utilizando .value.

  reactive:
  Convierte un objeto en reactivo. Sus propiedades
  se modifican directamente, sin utilizar .value.

  computed:
  Crea propiedades calculadas que se actualizan
  cuando cambian sus dependencias.

  onMounted:
  Ejecuta una función cuando el componente
  ya se ha montado en la página.
*/
import { ref, reactive, computed, onMounted } from "vue";

/*
  FUNCIONES PARA PROVINCIAS Y MUNICIPIOS

  obtenerProvincias:
  Solicita al backend la lista de provincias.

  obtenerMunicipios:
  Solicita los municipios de una provincia.
*/
import { obtenerProvincias, obtenerMunicipios } from "../api/municipios.js";

/*
  FUNCIONES CRUD DE PACIENTES

  getPacientes: obtener pacientes.
  savePaciente: crear paciente.
  updatePaciente: actualizar paciente.
  deletePaciente: eliminar paciente.
*/
import {
  getPacientes,
  savePaciente,
  updatePaciente,
  deletePaciente,
} from "../api/pacientes.js";

/*
  FUNCIONES DE ALERTAS

  alertaExito: muestra un mensaje de éxito.
  alertaError: muestra un mensaje de error.
  alertaConfirmacion: solicita confirmación al usuario.
*/
import {
  alertaExito,
  alertaError,
  alertaConfirmacion,
} from "../utils/alertas.js";

// Función que genera un documento PDF.
import { generarPDF } from "../utils/pdf.js";

// Store de Pinia que permite compartir el paciente seleccionado.
import { usePacienteStore } from "../store/pacienteStore.js";

/*
  VARIABLES REACTIVAS

  pacientes:
  Array con todos los pacientes de MongoDB.

  provincias:
  Array con las provincias disponibles.

  municipios:
  Array con los municipios de la provincia seleccionada.

  Inicialmente los tres arrays están vacíos.
*/
const pacientes = ref([]);
const provincias = ref([]);
const municipios = ref([]);

/*
  OBJETO REACTIVO: novoPaciente

  Contiene todos los campos del formulario.

  dnipac: DNI o NIE.
  nomepac: nombre.
  apelpac: apellidos.
  nacipac: fecha de nacimiento.
  mailpac: correo electrónico.
  movilpac: teléfono móvil.
  dirpac: dirección.
  propac: provincia.
  munipac: municipio.
  lodpac: aceptación de la política de privacidad.

  reactive permite que Vue actualice automáticamente
  el formulario cuando cambian estas propiedades.

  EJEMPLO:
  novoPaciente.nomepac = "Ana";

  No utilizamos novoPaciente.value.
*/
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

/*
  VARIABLES DE CONTROL

  editandoIndex:
  Guarda la posición del paciente que estamos editando.
  null significa que no estamos editando ninguno.

  dniComprobado:
  Indica si debemos mostrar los errores del DNI.

  telefonoComprobado:
  Indica si debemos mostrar los errores del teléfono.
*/
const editandoIndex = ref(null);
const dniComprobado = ref(false);
const telefonoComprobado = ref(false);

/*
  ONMOUNTED: CARGA INICIAL

  OBJETIVO:
  Cargar las provincias y los pacientes cuando
  se abre el componente.

  PASO A PASO:
  1. onMounted ejecuta la función al montar el componente.
  2. try intenta realizar las peticiones.
  3. await espera la respuesta de cada petición.
  4. Guardamos los datos en sus arrays reactivos.
  5. Si ocurre un error, catch lo captura.
  6. Mostramos el error en consola y una alerta.

  IMPORTANTE:
  async permite utilizar await dentro de la función.
*/
onMounted(async () => {
  try {
    provincias.value = await obtenerProvincias();
    pacientes.value = await getPacientes();
  } catch (error) {
    console.error("Error al cargar pacientes o provincias:", error);
    await alertaError(
      "No se pudieron cargar los datos. Comprueba la conexión con el servidor."
    );
  }
});

/*
  FUNCIÓN: seleccionarPaciente(paciente)

  OBJETIVO:
  Guardar un paciente seleccionado en Pinia.

  PARÁMETRO:
  paciente: objeto que contiene los datos del paciente.

  PASO A PASO:
  1. usePacienteStore() obtiene el store de pacientes.
  2. seleccionarPaciente() guarda sus datos en el store.

  Esto permite que otros componentes, como XestionCitas,
  puedan utilizar el DNI del paciente seleccionado
  sin tener que volver a introducirlo.
*/
function seleccionarPaciente(paciente) {
  const pacienteStore = usePacienteStore();
  pacienteStore.seleccionarPaciente(paciente);
}

/*
  COMPUTED: dniValido

  OBJETIVO:
  Comprobar si el DNI o NIE introducido es válido.

  PASO 1: NORMALIZAR EL TEXTO

  trim() elimina espacios al principio y al final.
  toUpperCase() convierte las letras a mayúsculas.

  PASO 2: DEFINIR LAS LETRAS

  La cadena letras contiene las letras válidas
  para calcular la letra de control del DNI/NIE.

  PASO 3: COMPROBAR DNI

  La expresión regular:
  /^\d{8}[A-Z]$/

  Significa:
  ^       Inicio del texto.
  \d{8}   Exactamente ocho dígitos.
  [A-Z]   Una letra mayúscula.
  $       Final del texto.

  test() devuelve true si el texto cumple el patrón.

  PASO 4: VALIDAR LA LETRA

  substring(0, 8) obtiene los ocho números.
  parseInt(..., 10) convierte el texto a entero decimal.
  charAt(8) obtiene la letra de la posición 8.

  numero % 23 calcula el resto de dividir entre 23.
  Ese resto determina la letra correcta.

  PASO 5: COMPROBAR NIE

  La expresión:
  /^[XYZ]\d{7}[A-Z]$/

  Exige:
  - Una X, Y o Z inicial.
  - Siete números.
  - Una letra final.

  Para calcular la letra:
  X se sustituye por 0.
  Y se sustituye por 1.
  Z se sustituye por 2.

  PASO 6: RESULTADO

  Devuelve true si el DNI/NIE es válido.
  Devuelve false en cualquier otro caso.

  Es computed porque depende de novoPaciente.dnipac.
*/
const dniValido = computed(() => {
  const dni = novoPaciente.dnipac.trim().toUpperCase();
  const letras = "TRWAGMYFPDXBNJZSQVHLCKE";

  if (/^\d{8}[A-Z]$/.test(dni)) {
    const numero = parseInt(dni.substring(0, 8), 10);
    const letra = dni.charAt(8);
    return letras[numero % 23] === letra;
  }

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

/*
  COMPUTED: telefonoValido

  OBJETIVO:
  Validar el número de teléfono móvil.

  Primero eliminamos espacios al principio y al final.

  EXPRESIÓN REGULAR:
  /^[67]\d{8}$/

  ^       Inicio del texto.
  [67]    Debe comenzar por 6 o 7.
  \d{8}   Después debe tener ocho dígitos.
  $       Final del texto.

  En total exige nueve dígitos.

  EJEMPLOS:
  612345678 -> true.
  712345678 -> true.
  512345678 -> false.
  61234567  -> false.

  test() devuelve un booleano.
*/
const telefonoValido = computed(() => {
  const telefono = novoPaciente.movilpac.trim();
  return /^[67]\d{8}$/.test(telefono);
});

/*
  COMPUTED: mensajeValidacion

  OBJETIVO:
  Determinar qué mensaje de error debemos mostrar.

  PRIMERA COMPROBACIÓN: DNI

  Exigimos tres condiciones:
  1. Que se haya activado dniComprobado.
  2. Que el DNI no esté vacío.
  3. Que dniValido sea false.

  Si se cumplen, devolvemos el mensaje del DNI.

  SEGUNDA COMPROBACIÓN: TELÉFONO

  Comprobamos lo mismo para el teléfono.

  IMPORTANTE:
  El operador ! invierte un booleano.

  !dniValido.value significa que el DNI NO es válido.

  El operador && significa Y.

  Si no hay errores que mostrar, devolvemos
  una cadena vacía.
*/
const mensajeValidacion = computed(() => {
  if (
    dniComprobado.value &&
    novoPaciente.dnipac.trim() !== "" &&
    !dniValido.value
  ) {
    return "⚠️ O DNI introducido non é válido.";
  }

  if (
    telefonoComprobado.value &&
    novoPaciente.movilpac.trim() !== "" &&
    !telefonoValido.value
  ) {
    return "⚠️ O teléfono debe comezar por 6 ou 7 e ter 9 díxitos.";
  }

  return "";
});

/*
  COMPUTED: hayErrorValidacion

  OBJETIVO:
  Saber si existe un mensaje de validación.

  Si mensajeValidacion no está vacío, devuelve true.
  Si está vacío, devuelve false.

  !== significa "distinto de" utilizando
  comparación estricta.
*/
const hayErrorValidacion = computed(
  () => mensajeValidacion.value !== ""
);

/*
  FUNCIÓN: nombreProvincia(valor)

  OBJETIVO:
  Obtener el nombre de una provincia a partir
  de su identificador o de su propio nombre.

  PARÁMETRO:
  valor: código o nombre de provincia.

  PASO A PASO:
  1. find() busca el primer elemento que cumple
     una condición dentro del array provincias.
  2. Comparamos el id convertido a texto.
  3. También comprobamos si el nombre coincide.
  4. Si encuentra la provincia, devolvemos su nombre.
  5. Si no la encuentra, devolvemos el valor original.

  OPERADORES IMPORTANTES:

  || significa O: basta con que una condición se cumpla.

  ?. es encadenamiento opcional:
  evita errores si provincia es undefined.

  ?? es fusión nula:
  utiliza valor cuando provincia?.nm es
  null o undefined.

  DIFERENCIA:
  find() devuelve un elemento o undefined.
  filter() devuelve un array.
*/
function nombreProvincia(valor) {
  const provincia = provincias.value.find(
    (p) =>
      String(p.id) === String(valor) ||
      p.nm === valor
  );

  return provincia?.nm ?? valor;
}

/*
  FUNCIÓN: cargarMunicipios()

  OBJETIVO:
  Cargar los municipios de la provincia seleccionada.

  PASO 1:
  Vaciamos el array de municipios.

  Esto evita mostrar municipios de otra provincia.

  PASO 2:
  Si no hay provincia seleccionada, terminamos
  inmediatamente utilizando return.

  PASO 3:
  Utilizamos find() para localizar la provincia
  cuyo nombre coincide con novoPaciente.propac.

  PASO 4:
  Si no existe, mostramos un error en consola
  y terminamos la función.

  PASO 5:
  Llamamos a obtenerMunicipios() pasando el id
  de la provincia encontrada.

  PASO 6:
  Si la petición falla, catch captura el error
  y mostramos una alerta.
*/
async function cargarMunicipios() {
  municipios.value = [];

  if (!novoPaciente.propac) return;

  const provincia = provincias.value.find(
    (p) => p.nm === novoPaciente.propac
  );

  if (!provincia) {
    console.error("Provincia no encontrada:", novoPaciente.propac);
    return;
  }

  try {
    municipios.value = await obtenerMunicipios(provincia.id);
  } catch (error) {
    console.error("Error al cargar municipios:", error);
    await alertaError("No se pudieron cargar los municipios.");
  }
}

/*
  FUNCIÓN: buscarPaciente()

  OBJETIVO:
  Buscar un paciente por su DNI o NIE.

  PASO 1:
  Obtenemos el DNI del formulario.
  trim() elimina espacios.
  toUpperCase() lo convierte a mayúsculas.

  PASO 2:
  Comprobamos dniValido.

  Si no es válido:
  - Activamos dniComprobado.
  - Terminamos con return.

  PASO 3:
  findIndex() busca la posición del paciente
  cuyo DNI coincide con el introducido.

  DIFERENCIA IMPORTANTE:
  find() devuelve el elemento.
  findIndex() devuelve su posición.

  Si no encuentra ningún elemento,
  findIndex() devuelve -1.

  PASO 4:
  Si el índice es -1, mostramos una alerta.

  PASO 5:
  Si lo encuentra:
  - Guardamos el paciente en Pinia.
  - Llamamos a editarPaciente() para cargar
    sus datos en el formulario.
*/
async function buscarPaciente() {
  const dni = novoPaciente.dnipac.trim().toUpperCase();

  if (!dniValido.value) {
    dniComprobado.value = true;
    return;
  }

  const index = pacientes.value.findIndex(
    (paciente) => paciente.dnipac.toUpperCase() === dni
  );

  if (index === -1) {
    await alertaError("No existe ningún paciente con ese DNI.");
    return;
  }

  seleccionarPaciente(pacientes.value[index]);
  await editarPaciente(index);
}

/*
  FUNCIÓN: guardarPaciente()

  OBJETIVO:
  Crear un paciente nuevo o actualizar uno existente.

  PASO 1: COPIAR LOS DATOS

  { ...novoPaciente } utiliza el operador spread.

  Crea un objeto nuevo con las propiedades
  del formulario.

  Esto evita trabajar directamente con el objeto
  reactivo original al preparar los datos.

  PASO 2: VALIDAR PROVINCIA

  some() comprueba si al menos un elemento
  cumple la condición.

  Si ninguna provincia tiene el nombre seleccionado,
  mostramos una alerta y terminamos.

  PASO 3: VALIDAR MUNICIPIO

  Hacemos lo mismo con el array de municipios.

  PASO 4: DETERMINAR LA OPERACIÓN

  Si editandoIndex.value es distinto de null,
  estamos actualizando un paciente.

  Si es null, estamos creando uno nuevo.

  PASO 5: ACTUALIZACIÓN

  Pedimos confirmación al usuario.

  isConfirmed indica si ha aceptado.

  Si cancela, terminamos con return.

  Obtenemos el paciente original utilizando
  su posición en el array.

  updatePaciente() envía el identificador _id
  y los nuevos datos al backend.

  Después sustituimos el elemento del array
  por el paciente actualizado.

  PASO 6: CREACIÓN

  savePaciente() envía los datos al backend.

  push() añade el paciente guardado al final
  del array de pacientes.

  PASO 7: FINALIZACIÓN

  Guardamos el paciente seleccionado en Pinia.
  Limpiamos el formulario.

  PASO 8: ERRORES

  catch captura los errores de la operación.

  error.response?.data?.mensaje intenta obtener
  el mensaje devuelto por el backend.

  Si no existe, utilizamos el mensaje genérico
  situado después del operador ||.
*/

// GUARDAR O ACTUALIZAR PACIENTE
async function guardarPaciente() {
  try {
    const pacienteParaGuardar = { ...novoPaciente };

    if (
      !provincias.value.some(
        (p) => p.nm === pacienteParaGuardar.propac
      )
    ) {
      await alertaError("Selecciona una provincia válida.");
      return;
    }

    if (
      !municipios.value.some(
        (m) => m.nm === pacienteParaGuardar.munipac
      )
    ) {
      await alertaError("Selecciona un municipio válido.");
      return;
    }

    let pacienteGuardado;

    if (editandoIndex.value !== null) {
      const confirmacion = await alertaConfirmacion(
        "¿Estás seguro de que quieres actualizar este paciente?"
      );

      if (!confirmacion.isConfirmed) return;

      const pacienteActual =
        pacientes.value[editandoIndex.value];

      pacienteGuardado = await updatePaciente(
        pacienteActual._id,
        pacienteParaGuardar
      );

      pacientes.value[editandoIndex.value] = pacienteGuardado;

      await alertaExito(
        "El paciente se ha actualizado correctamente."
      );
    } else {
      pacienteGuardado = await savePaciente(pacienteParaGuardar);

      pacientes.value.push(pacienteGuardado);

      await alertaExito(
        "El paciente se ha guardado correctamente."
      );
    }

    seleccionarPaciente(pacienteGuardado);
    limpiarFormulario();

  } catch (error) {
    console.error("Error al guardar paciente:", error);

    await alertaError(
      error.response?.data?.mensaje ||
      "Error al guardar paciente, contacte con el administrador."
    );
  }
}

/*
  FUNCIÓN: limpiarFormulario()

  OBJETIVO:
  Dejar el formulario preparado para introducir
  un paciente nuevo.

  PASO 1:
  Object.assign() copia las propiedades del segundo
  objeto sobre el primero.

  Aquí restablecemos todos los campos de novoPaciente.

  IMPORTANTE:
  No sustituimos el objeto reactive.
  Modificamos sus propiedades para conservar
  su reactividad.

  PASO 2:
  Vaciamos el array de municipios.

  PASO 3:
  Ponemos editandoIndex en null para salir
  del modo edición.

  PASO 4:
  Restablecemos los indicadores de validación.
*/

// LIMPIAR FORMULARIO
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

  municipios.value = [];
  editandoIndex.value = null;
  dniComprobado.value = false;
  telefonoComprobado.value = false;
}

/*
  FUNCIÓN: eliminarPaciente(index)

  OBJETIVO:
  Eliminar un paciente del backend y de la tabla.

  PARÁMETRO:
  index: posición del paciente dentro del array.

  PASO 1:
  Pedimos confirmación al usuario.

  PASO 2:
  Si cancela, terminamos con return.

  PASO 3:
  Obtenemos el paciente mediante su índice.

  PASO 4:
  deletePaciente() envía el _id al backend
  para eliminarlo de MongoDB.

  PASO 5:
  splice(index, 1) elimina un elemento del array
  a partir de la posición indicada.

  IMPORTANTE:
  splice() modifica el array original.

  PASO 6:
  Mostramos una alerta de éxito.

  PASO 7:
  Si estábamos editando ese mismo paciente,
  limpiamos el formulario.

  PASO 8:
  Si ocurre un error, lo capturamos con catch
  y mostramos el mensaje correspondiente.
*/

// ELIMINAR PACIENTE
async function eliminarPaciente(index) {
  try {
    const confirmacion = await alertaConfirmacion(
      "¿Estás seguro de eliminar el paciente?"
    );

    if (!confirmacion.isConfirmed) return;

    const paciente = pacientes.value[index];

    await deletePaciente(paciente._id);

    pacientes.value.splice(index, 1);

    await alertaExito("Paciente eliminado correctamente.");

    if (editandoIndex.value === index) {
      limpiarFormulario();
    }

  } catch (error) {
    console.error("Error al eliminar paciente:", error);

    await alertaError(
      error.response?.data?.mensaje ||
      "Error al eliminar paciente, contacte con el administrador."
    );
  }
}

/*
  FUNCIÓN: editarPaciente(index)

  OBJETIVO:
  Cargar en el formulario los datos de un paciente
  que ya existe para poder modificarlos.

  PASO 1: OBTENER EL PACIENTE

  Utilizamos index para acceder al elemento
  correspondiente dentro del array.

  PASO 2: COPIAR SUS DATOS

  Object.assign() copia las propiedades del paciente
  al objeto reactivo novoPaciente.

  También lo guardamos en Pinia.

  PASO 3: LOCALIZAR LA PROVINCIA

  find() busca la provincia cuyo nombre o código
  coincide con el valor guardado en el paciente.

  Esto permite trabajar tanto con nombres como
  con códigos de provincia.

  PASO 4: CARGAR MUNICIPIOS

  Vaciamos el array de municipios.

  Si encontramos la provincia:
  - Guardamos su nombre.
  - Obtenemos sus municipios desde la API.

  PASO 5: LOCALIZAR EL MUNICIPIO

  Utilizamos find() para buscar por nombre o código.

  municipio?.nm ?? "" significa:
  - Si existe municipio.nm, utilizamos su nombre.
  - Si no existe, utilizamos una cadena vacía.

  PASO 6: GESTIONAR ERRORES

  Si falla la carga de municipios:
  - Mostramos el error en consola.
  - Vaciamos el municipio.
  - Mostramos una alerta.

  Si no encontramos la provincia:
  - Vaciamos provincia y municipio.

  PASO 7: ACTIVAR EL MODO EDICIÓN

  lodpac = true:
  Marca la aceptación de la política de privacidad
  para el paciente que ya estaba registrado.

  editandoIndex = index:
  Guarda la posición del paciente que estamos editando.

  dniComprobado y telefonoComprobado:
  Se ponen a true para activar la comprobación
  visual de ambos campos.

  PASO 8: DESPLAZAMIENTO

  window.scrollTo() mueve la página al principio
  para mostrar el formulario.

  behavior: "smooth" produce un desplazamiento suave.
*/

// EDITAR PACIENTE
async function editarPaciente(index) {
  const paciente = pacientes.value[index];

  Object.assign(novoPaciente, paciente);
  seleccionarPaciente(paciente);

  const provincia = provincias.value.find(
    (p) =>
      p.nm === String(paciente.propac) ||
      String(p.id) === String(paciente.propac)
  );

  municipios.value = [];

  if (provincia) {
    novoPaciente.propac = provincia.nm;

    try {
      municipios.value = await obtenerMunicipios(provincia.id);

      const municipio = municipios.value.find(
        (m) =>
          m.nm === String(paciente.munipac) ||
          String(m.id) === String(paciente.munipac)
      );

      novoPaciente.munipac = municipio?.nm ?? "";

    } catch (error) {
      console.error("Error al cargar municipios:", error);

      novoPaciente.munipac = "";
      await alertaError("No se pudieron cargar los municipios.");
    }

  } else {
    novoPaciente.propac = "";
    novoPaciente.munipac = "";
  }

  novoPaciente.lodpac = true;
  editandoIndex.value = index;
  dniComprobado.value = true;
  telefonoComprobado.value = true;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/*
  FUNCIÓN: exportarPacientes()

  OBJETIVO:
  Generar un PDF con el listado de pacientes.

  generarPDF() recibe cuatro argumentos:

  1. Título del documento.
  2. Array con las cabeceras de la tabla.
  3. Array con las filas que queremos exportar.
  4. Nombre del archivo PDF.

  PASO A PASO:
  1. Accedemos al array pacientes.value.
  2. map() recorre cada paciente.
  3. Transformamos cada paciente en un array
     con los datos de su fila.
  4. index + 1 genera la numeración de pacientes.
  5. nombreProvincia() obtiene el nombre de la
     provincia para mostrarlo en el PDF.
  6. generarPDF() crea el documento.

  IMPORTANTE:
  map() devuelve un array nuevo.
  No modifica el array original de pacientes.
*/

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
      nombreProvincia(paciente.propac),
    ]),
    "listado_pacientes.pdf"
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
  margin-top: 10px;
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

.xestion-pacientes {
  padding-bottom: 1.25rem;
}

/* Espacio fijo y compacto: una sola línea incluso con errores */
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

/* =========================
   BOTÓN
   ========================= */

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
  table-layout: fixed;

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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Anchuras calculadas para priorizar el correo sin comprimir acciones */
.tabla-pacientes .col-numero {
  width: 6%;
}
.tabla-pacientes .col-dni {
  width: 16%;
}
.tabla-pacientes .col-nome {
  width: 16%;
}
.tabla-pacientes .col-correo {
  width: 33%;
}
.tabla-pacientes .col-provincia {
  width: 16%;
}
.tabla-pacientes .col-accions {
  width: 13%;
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

  .tabla-pacientes {
    min-width: 700px;
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

/* Contenedor con scroll */
.tabla-contenedor {
  height: 350px;
  overflow: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* Tabla */
.tabla-pacientes {
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
  margin: 0;
  border: none;
  overflow: visible;
}

/* Encabezado fijo */
.tabla-pacientes thead th {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #f3f7f5;
  border: 1.8px solid;
}
</style>
