
<template>
  <!-- Contenedor principal de la gestión de citas. -->
  <div class="xestion-citas">
    <h4>📅 Xestión de Citas</h4>

    <!--
      FORMULARIO

      @submit.prevent="guardarCita":

      @submit escucha el evento de envío.

      .prevent ejecuta event.preventDefault()
      para evitar que el navegador recargue la página.

      guardarCita es la función del script
      que guarda o actualiza la cita.

      El evento submit se produce al pulsar
      un botón de tipo submit.
    -->
    <form @submit.prevent="guardarCita">

      <!-- Primera fila: identificadores y selecciones. -->
      <div class="fila fila-principal">

        <div class="campo">
          <label>ID Cita:</label>

          <!--
            v-model="idCitaEditar":
            Vincula el valor con la variable reactiva.

            readonly:
            Impide que el usuario escriba manualmente.

            El identificador se muestra cuando
            estamos editando una cita existente.
          -->
          <input
            v-model="idCitaEditar"
            type="text"
            placeholder="ID cita"
            readonly
          />
        </div>

        <div class="campo">
          <label>Paciente:</label>

          <!--
            :value:
            Asigna dinámicamente el valor del input.

            pacienteStore.dnipac:
            Obtiene el DNI del paciente seleccionado
            que está guardado en Pinia.

            || '':
            Si no hay un DNI disponible, utiliza
            una cadena vacía.

            readonly:
            Impide modificarlo desde este campo.

            DIFERENCIA:
            :value muestra un valor.
            v-model permite vinculación bidireccional.
          -->
          <input
            :value="pacienteStore.dnipac || ''"
            type="text"
            placeholder="DNI paciente"
            readonly
          />
        </div>

        <div class="campo">
          <label>Doctor:</label>

          <!--
            nombreDoctorMostrado:
            Valor calculado en el script que contiene
            el nombre del doctor seleccionado.

            :value muestra el resultado.

            readonly impide escribir manualmente.
          -->
          <input
            :value="nombreDoctorMostrado"
            type="text"
            placeholder="Doctor seleccionado"
            readonly
          />
        </div>

        <div class="campo">
          <label>ID Doctor:</label>

          <!--
            doctorIdEfectivo:
            Valor calculado que representa
            el identificador del doctor utilizado
            para la cita.

            :value lo muestra en el input.
          -->
          <input
            :value="doctorIdEfectivo"
            type="text"
            placeholder="ID Doctor"
            readonly
          />
        </div>

        <!--
          BOTÓN LIMPIAR

          type="button":
          Evita que este botón envíe el formulario.

          @click="limpiarTodo":
          Ejecuta la función que limpia los datos
          correspondientes del formulario y la selección.

          title:
          Muestra una descripción del botón.
        -->
        <button
          type="button"
          class="btn-limpiar"
          @click="limpiarTodo"
          title="Limpiar"
        >
          🧹
        </button>
      </div>

      <!-- Segunda fila: datos de la cita. -->
      <div class="fila fila-secundaria">

        <div class="campo">
          <label>Fecha:</label>

          <!--
            v-model="novaCita.fecha":
            Vincula el input con la propiedad fecha
            del objeto reactivo novaCita.

            type="date":
            Permite seleccionar una fecha.

            required:
            El navegador exige rellenar este campo
            antes de enviar el formulario.
          -->
          <input v-model="novaCita.fecha" type="date" required />
        </div>

        <div class="campo">
          <label>Hora:</label>

          <!--
            type="time":
            Permite seleccionar una hora.

            v-model:
            Guarda la hora en novaCita.hora.

            required:
            Campo obligatorio.
          -->
          <input v-model="novaCita.hora" type="time" required />
        </div>

        <div class="campo">

          <!--
            MOTIVO DE LA CITA

            El texto introducido se guarda
            automáticamente en novaCita.motivo.

            required:
            El campo no puede quedar vacío
            al enviar el formulario.
          -->
          <input
            v-model="novaCita.motivo"
            type="text"
            placeholder="Motivo da cita"
            required
          />
        </div>

        <div class="campo">

          <!--
            SELECT DE ESTADO

            v-model="novaCita.estado":
            Vincula el desplegable con el estado
            de la cita.

            Cada option tiene un atributo value.

            Ese value es el dato que se guarda
            en novaCita.estado.

            EJEMPLO:
            Si seleccionamos "Confirmada",
            novaCita.estado será "confirmada".

            IMPORTANTE:
            El texto visible y el value
            no tienen por qué ser iguales.
          -->
          <select v-model="novaCita.estado">
            <option value="pendente">Pendente</option>
            <option value="confirmada">Confirmada</option>
            <option value="realizada">Realizada</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
      </div>

      <!--
        TEXTAREA

        Permite escribir texto de varias líneas.

        v-model="novaCita.observacions":
        Guarda el contenido en el objeto reactivo.

        rows="3":
        Establece una altura inicial aproximada
        de tres líneas.
      -->
      <textarea
        v-model="novaCita.observacions"
        placeholder="Diagnóstico - Tratamento"
        rows="3"
      ></textarea>

      <div class="botones-formulario">

        <!--
          BOTÓN GUARDAR / ACTUALIZAR

          type="submit":
          Envía el formulario y activa @submit.

          :disabled="!formularioValido":
          Deshabilita el botón si el formulario
          no cumple las condiciones de validación.

          ! es el operador de negación.

          Si formularioValido es false,
          !formularioValido será true.

          INTERPOLACIÓN TERNARIA:

          editando ? "Actualizar" : "Gardar"

          Si editando es true:
          Muestra "Actualizar".

          Si editando es false:
          Muestra "Gardar".

          Se utiliza el mismo botón para
          crear y actualizar citas.
        -->
        <button type="submit" class="btn-guardar" :disabled="!formularioValido">
          {{ editando ? "Actualizar" : "Gardar" }}
        </button>
      </div>
    </form>

    <!--
      TÍTULO DEL LISTADO

      Las interpolaciones leen los datos
      del paciente seleccionado desde Pinia.

      pacienteStore.nomepac:
      Nombre del paciente.

      pacienteStore.apelpac:
      Apellidos del paciente.

      Cuando cambian esos datos en el store,
      Vue actualiza el texto mostrado.
    -->
    <h4 class="titulo-listado">
      📋 Listaxe de Citas Paciente
      {{ pacienteStore.nomepac }}
      {{ pacienteStore.apelpac }}

      <!--
        BOTÓN ACTUALIZAR

        type="button":
        No envía ningún formulario.

        @click="cargarCitas":
        Ejecuta la función que vuelve
        a consultar las citas.

        ⟳:
        Símbolo visual de actualización.
      -->
      <button
        type="button"
        class="btn-actualizar"
        @click="cargarCitas"
        title="Actualizar listado"
      >
        ⟳
      </button>
    </h4>

    <!--
      LISTADO CONDICIONAL

      v-if="citas.length > 0":
      Muestra la tabla únicamente cuando
      el array citas contiene elementos.

      Si el array está vacío,
      se mostrará el párrafo con v-else.
    -->
    <div v-if="citas.length > 0" class="tabla-contenedor">
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Doctor</th>
            <th>Motivo</th>
            <th>Estado</th>
            <th>Accións</th>
          </tr>
        </thead>

        <tbody>

          <!--
            DIRECTIVA v-for

            v-for="cita in citas":
            Recorre el array de citas.

            Por cada objeto cita genera
            una fila de la tabla.

            :key="cita._id":
            Utiliza el identificador único
            de MongoDB para identificar cada fila.
          -->
          <tr v-for="cita in citas" :key="cita._id">

            <!-- Fecha de la cita. -->
            <td>{{ cita.fecha }}</td>

            <!-- Hora de la cita. -->
            <td>{{ cita.hora }}</td>

            <!--
              DATOS DEL DOCTOR

              ?. es el operador de encadenamiento
              opcional (optional chaining).

              cita.doctorId?.nomedoc:
              Accede al nombre del doctor solamente
              si cita.doctorId no es null ni undefined.

              Esto evita errores si no existe
              el objeto del doctor.

              El backend utiliza populate()
              para recuperar estos datos.
            -->
            <td>
              {{ cita.doctorId?.nomedoc }}
              {{ cita.doctorId?.apeldoc }}
            </td>

            <!-- Motivo de la cita. -->
            <td>{{ cita.motivo }}</td>

            <!-- Estado de la cita. -->
            <td>{{ cita.estado }}</td>

            <!--
              COLUMNA DE ACCIONES

              Contiene los botones para editar
              y eliminar la cita de esta fila.
            -->
            <td class="acciones">

              <!--
                EDITAR CITA

                @click="editarCita(cita)":
                Pasa el objeto completo de la cita
                a la función editarCita().

                La función puede utilizar sus datos
                para rellenar el formulario.
              -->
              <button type="button" @click="editarCita(cita)">✏️</button>

              <!--
                ELIMINAR CITA

                @click="eliminarCita(cita)":
                Pasa el objeto cita a la función
                encargada de solicitar y realizar
                la eliminación correspondiente.
              -->
              <button type="button" @click="eliminarCita(cita)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--
      MENSAJE ALTERNATIVO

      v-else:
      Se muestra si la condición del v-if
      anterior es falsa.

      En este caso, cuando citas.length es 0.

      IMPORTANTE:
      Un array vacío no significa necesariamente
      que haya fallado la conexión.

      El mismo mensaje se utiliza para ambos casos
      en el código original.
    -->
    <p v-else class="mensaje">
      Non hai citas cargadas ou falla a conexión coa BBDD.
    </p>
  </div>
</template>

<script setup>
/*
  IMPORTACIONES DE VUE

  ref:
  Crea variables reactivas. Para acceder o modificarlas
  desde JavaScript utilizamos .value.

  reactive:
  Crea un objeto reactivo. Sus propiedades se pueden
  modificar directamente, sin utilizar .value.

  computed:
  Crea valores calculados que se actualizan cuando
  cambian las variables reactivas de las que dependen.

  watch:
  Vigila los cambios de una variable reactiva y
  ejecuta una función cuando cambia.
*/
import { ref, reactive, computed, watch } from "vue";

/*
  IMPORTACIONES DE PINIA

  Estos stores permiten compartir información entre
  distintos componentes de la aplicación.

  pacienteStore:
  Guarda los datos del paciente seleccionado.

  doctorStore:
  Guarda los datos del doctor seleccionado.
*/
import { usePacienteStore } from "../store/pacienteStore.js";
import { useDoctorStore } from "../store/doctorStore.js";

/*
  IMPORTACIONES DE LA API

  getCitas: obtener citas del backend.
  saveCita: crear una cita.
  updateCita: actualizar una cita existente.
  deleteCita: eliminar una cita.
*/
import { getCitas, saveCita, updateCita, deleteCita } from "../api/citas.js";

/*
  IMPORTACIONES DE ALERTAS

  alertaExito:
  Muestra una alerta cuando una operación termina bien.

  alertaError:
  Muestra una alerta cuando ocurre un error.

  alertaConfirmacion:
  Pregunta al usuario si quiere continuar con una
  operación, por ejemplo actualizar o eliminar.
*/
import {
  alertaExito,
  alertaError,
  alertaConfirmacion,
} from "../utils/alertas.js";

/*
  INSTANCIAS DE LOS STORES

  Obtenemos acceso a los datos y funciones de Pinia.

  Gracias a esto podemos saber qué paciente y qué
  doctor se han seleccionado en otros componentes.
*/
const pacienteStore = usePacienteStore();
const doctorStore = useDoctorStore();

/*
  ARRAY DE CITAS

  Al principio está vacío.

  Cuando carguemos las citas desde el backend,
  guardaremos los resultados en citas.value.
*/
const citas = ref([]);

/*
  CONTROL DEL MODO EDICIÓN

  editando:
  false -> estamos creando una cita nueva.
  true -> estamos modificando una cita existente.

  idCitaEditar:
  Guarda el identificador de MongoDB de la cita
  que estamos editando.
*/
const editando = ref(false);
const idCitaEditar = ref("");

/*
  OBJETO REACTIVO DEL FORMULARIO

  reactive permite agrupar todos los campos
  del formulario en un único objeto.

  doctorId:
  Inicialmente utiliza el doctor seleccionado en Pinia.

  fecha:
  Fecha de la cita.

  hora:
  Hora de la cita.

  motivo:
  Motivo por el que el paciente solicita la cita.

  observacions:
  Información adicional.

  estado:
  Estado inicial de la cita: "pendente".

  IMPORTANTE:
  Como utilizamos reactive, accedemos a los campos
  mediante novaCita.fecha, novaCita.hora, etc.
  No necesitamos escribir novaCita.value.
*/
const novaCita = reactive({
  doctorId: doctorStore.doctorId,
  fecha: "",
  hora: "",
  motivo: "",
  observacions: "",
  estado: "pendente",
});

/*
  COMPUTED: doctorIdEfectivo

  OBJETIVO:
  Determinar qué identificador de doctor se utilizará
  para guardar o actualizar una cita.

  OPERADOR TERNARIO:
  condicion ? valorSiTrue : valorSiFalse

  Si estamos editando:
  Utilizamos novaCita.doctorId, porque la cita
  puede estar asociada a otro doctor.

  Si estamos creando:
  Utilizamos doctorStore.doctorId, que corresponde
  al doctor seleccionado actualmente en Pinia.

  Es computed porque depende de editando y
  del identificador del doctor.
*/
const doctorIdEfectivo = computed(() =>
  editando.value ? novaCita.doctorId : doctorStore.doctorId
);

/*
  COMPUTED: nombreDoctorMostrado

  OBJETIVO:
  Obtener el nombre del doctor que debe aparecer
  en el formulario.

  PASO A PASO:
  1. Comprobamos si estamos editando.
  2. Si existe nombreDoctorCita, lo devolvemos.
  3. En caso contrario, obtenemos el nombre y
     apellidos del doctor seleccionado en Pinia.
  4. trim() elimina los espacios sobrantes.

  El operador && significa "Y".
  Ambas condiciones deben cumplirse.

  IMPORTANTE:
  computed se recalcula cuando cambian los datos
  reactivos utilizados en su interior.
*/
const nombreDoctorMostrado = computed(() => {
  if (editando.value && nombreDoctorCita.value) return nombreDoctorCita.value;
  return `${doctorStore.nomedoc} ${doctorStore.apeldoc}`.trim();
});

/*
  NOMBRE DEL DOCTOR DE LA CITA

  Se utiliza especialmente al editar una cita,
  para conservar el nombre del doctor que ya
  estaba asociado a ella.
*/
const nombreDoctorCita = ref("");

/*
  COMPUTED: formularioValido

  OBJETIVO:
  Comprobar que el formulario contiene los datos
  obligatorios antes de permitir guardar una cita.

  CONDICIONES:
  1. Debe existir un DNI de paciente seleccionado.
  2. Debe existir un identificador de doctor.
  3. La fecha no puede estar vacía.
  4. La hora no puede estar vacía.
  5. El motivo no puede estar vacío.

  Boolean() convierte el resultado en true o false.

  El operador && exige que todas las condiciones
  sean verdaderas.

  trim() elimina espacios al principio y al final
  del motivo. Así evitamos aceptar un motivo
  formado únicamente por espacios.

  RESULTADO:
  true -> formulario válido.
  false -> faltan datos obligatorios.
*/
const formularioValido = computed(() => {
  return Boolean(
    pacienteStore.dnipac &&
    doctorIdEfectivo.value !== "" &&
    novaCita.fecha !== "" &&
    novaCita.hora !== "" &&
    novaCita.motivo.trim() !== ""
  );
});

/*
  WATCH: pacienteStore.dnipac

  OBJETIVO:
  Detectar cuándo cambia el paciente seleccionado.

  PASO A PASO:
  1. Observamos el DNI almacenado en Pinia.
  2. Cuando cambia, limpiamos el formulario.
  3. Después cargamos las citas del nuevo paciente.

  La función es async porque cargarCitas()
  realiza una petición al backend.

  await espera a que termine la carga.

  immediate: true significa que el watch también
  se ejecuta al crearse, sin esperar a que cambie
  el DNI por primera vez.

  EJEMPLO:
  Seleccionamos al paciente A -> vemos sus citas.
  Seleccionamos al paciente B -> se limpia el
  formulario y aparecen las citas de B.
*/
watch(
  () => pacienteStore.dnipac,
  async () => {
    limpiarFormulario();
    await cargarCitas();
  },
  { immediate: true },
);

/*
  WATCH: doctorStore.doctorId

  OBJETIVO:
  Detectar cuándo cambia el doctor seleccionado.

  Cuando cambia, ejecutamos limpiarFormulario()
  para evitar mantener datos de una cita anterior.

  En este caso no necesitamos async porque
  limpiarFormulario() no realiza peticiones HTTP.
*/
watch(
  () => doctorStore.doctorId,
  () => limpiarFormulario(),
);

/*
  FUNCIÓN: cargarCitas()

  OBJETIVO:
  Obtener las citas del paciente seleccionado.

  PASO A PASO:

  1. Comprobamos si existe un paciente seleccionado.

  2. Si no existe:
     - Vaciamos el array de citas.
     - Terminamos la función con return.

  3. Si existe:
     - Llamamos a getCitas() pasando el DNI.
     - Esperamos la respuesta del backend.

  4. Utilizamos filter() para quedarnos únicamente
     con las citas cuyo pacienteDNI coincida
     con el DNI del paciente seleccionado.

  5. Guardamos el resultado en citas.value.

  6. Si ocurre un error:
     - Lo mostramos en la consola.
     - Vaciamos el array.
     - Mostramos una alerta de error.

  IMPORTANTE:
  filter() devuelve un array nuevo sin modificar
  el array original.
*/
async function cargarCitas() {
  if (!pacienteStore.dnipac) {
    citas.value = [];
    return;
  }

  try {
    const todasLasCitas = await getCitas(pacienteStore.dnipac);

    citas.value = todasLasCitas.filter(
      cita => cita.pacienteDNI === pacienteStore.dnipac
    );

  } catch (error) {
    console.error("Error ao cargar citas:", error);
    citas.value = [];
    alertaError("Error ao cargar as citas.");
  }
}

/*
  FUNCIÓN: guardarCita()

  OBJETIVO:
  Crear una cita nueva o actualizar una existente.

  Esta función realiza dos operaciones diferentes
  dependiendo del valor de editando.

  PASO 1: VALIDACIÓN

  Comprobamos formularioValido.value.

  Si es false, terminamos inmediatamente
  con return y no enviamos datos al backend.

  PASO 2: PREPARACIÓN DE DATOS

  Creamos el objeto datosCita con los valores
  que necesitamos enviar a la API.

  El DNI procede de pacienteStore.
  El doctor procede de doctorIdEfectivo.
  El resto de campos proceden de novaCita.

  PASO 3: COMPROBAR SI ESTAMOS EDITANDO

  Si editando.value es true:
  - Pedimos confirmación al usuario.
  - Si cancela, terminamos con return.
  - Si confirma, llamamos a updateCita().
  - Mostramos una alerta de éxito.

  Si editando.value es false:
  - Llamamos a saveCita().
  - Mostramos una alerta de éxito.

  PASO 4: ACTUALIZAR LA INTERFAZ

  Limpiamos el formulario y volvemos a cargar
  las citas para mostrar los datos actualizados.

  PASO 5: GESTIÓN DE ERRORES

  Si falla alguna operación dentro del try,
  catch captura el error y muestra una alerta.

  IMPORTANTE:
  await permite esperar a que termine cada
  operación antes de ejecutar la siguiente.
*/
async function guardarCita() {
  if (!formularioValido.value) {
    return;
  }

  const datosCita = {
    pacienteDNI: pacienteStore.dnipac,
    doctorId: doctorIdEfectivo.value,
    fecha: novaCita.fecha,
    hora: novaCita.hora,
    motivo: novaCita.motivo,
    observacions: novaCita.observacions,
    estado: novaCita.estado,
  };

  try {
    if (editando.value) {
      const confirmacion = await alertaConfirmacion(
        "¿Estás seguro de actualizar esta cita?",
      );

      if (!confirmacion.isConfirmed) {
        return;
      }

      await updateCita(idCitaEditar.value, datosCita);
      await alertaExito("Cita actualizada correctamente.");
    } else {
      await saveCita(datosCita);
      await alertaExito("Cita gardada correctamente.");
    }

    limpiarFormulario();
    await cargarCitas();
  } catch (error) {
    console.error("Error ao gardar cita:", error);
    alertaError("Error ao gardar a cita.");
  }
}

/*
  FUNCIÓN: editarCita(cita)

  OBJETIVO:
  Cargar los datos de una cita existente en
  el formulario para poder modificarlos.

  PARÁMETRO:
  cita: objeto que representa la cita seleccionada.

  PASO 1: OBTENER EL DOCTOR

  cita.doctorId puede contener:
  - Un objeto con los datos del doctor.
  - Directamente el identificador del doctor.

  El operador ?. es encadenamiento opcional.
  Permite acceder a _id sin provocar un error
  si doctorId es null o undefined.

  El operador || utiliza el segundo valor
  si el primero es falsy.

  PASO 2: VALIDAR EL DOCTOR

  Si no existe un identificador de doctor,
  mostramos un error y terminamos.

  PASO 3: CARGAR LOS DATOS

  Guardamos el _id de la cita que vamos a editar.

  Copiamos al formulario:
  - Doctor
  - Fecha
  - Hora
  - Motivo
  - Observaciones
  - Estado

  PASO 4: NOMBRE DEL DOCTOR

  typeof comprueba el tipo de dato.

  Si doctorId es un objeto, obtenemos su
  nombre y apellidos.

  Si no es un objeto, mostramos "Doctor da cita".

  PASO 5: ACTIVAR EDICIÓN

  editando.value = true indica que el botón
  de guardar debe actualizar una cita existente.

  PASO 6: SUBIR AL FORMULARIO

  window.scrollTo() desplaza la página al principio.

  behavior: "smooth" realiza el desplazamiento
  de forma suave.
*/
function editarCita(cita) {
  const idDoctorCita = cita.doctorId?._id || cita.doctorId;
  if (!idDoctorCita) {
    alertaError("Esta cita non ten un doctor válido asociado.");
    return;
  }
  idCitaEditar.value = cita._id;
  novaCita.doctorId = idDoctorCita;
  nombreDoctorCita.value = typeof cita.doctorId === "object"
    ? `${cita.doctorId.nomedoc || ""} ${cita.doctorId.apeldoc || ""}`.trim()
    : "Doctor da cita";
  novaCita.fecha = cita.fecha;
  novaCita.hora = cita.hora;
  novaCita.motivo = cita.motivo;
  novaCita.observacions = cita.observacions || "";
  novaCita.estado = cita.estado;

  editando.value = true;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/*
  FUNCIÓN: eliminarCita(cita)

  OBJETIVO:
  Eliminar una cita después de pedir confirmación.

  PARÁMETRO:
  cita: objeto que contiene la cita que queremos borrar.

  PASO 1: CONFIRMACIÓN

  Llamamos a alertaConfirmacion().
  await espera a que el usuario responda.

  PASO 2: COMPROBAR LA RESPUESTA

  Si isConfirmed es false, terminamos con return.

  PASO 3: ELIMINACIÓN

  Llamamos a deleteCita() pasando el _id.

  PASO 4: LIMPIAR SI ESTAMOS EDITANDO ESA CITA

  Si el identificador de la cita eliminada coincide
  con idCitaEditar, limpiamos el formulario.

  PASO 5: ACTUALIZAR LA TABLA

  Volvemos a cargar las citas y mostramos
  una alerta de éxito.

  PASO 6: ERRORES

  Si falla la eliminación, catch captura el error
  y muestra una alerta.
*/
async function eliminarCita(cita) {
  const confirmacion = await alertaConfirmacion(
    "¿Estás seguro de eliminar esta cita?",
  );

  if (!confirmacion.isConfirmed) {
    return;
  }

  try {
    await deleteCita(cita._id);

    if (idCitaEditar.value === cita._id) {
      limpiarFormulario();
    }

    await cargarCitas();
    await alertaExito("Cita eliminada correctamente.");
  } catch (error) {
    console.error("Error ao eliminar cita:", error);
    alertaError("Error ao eliminar a cita.");
  }
}

/*
  FUNCIÓN: limpiarFormulario()

  OBJETIVO:
  Restablecer el formulario a su estado inicial.

  PASO 1: REINICIAR LOS CAMPOS

  Object.assign() copia las propiedades del
  segundo objeto sobre el primero.

  En este caso modifica novaCita directamente,
  manteniendo su reactividad.

  IMPORTANTE:
  No sustituimos el objeto reactive por otro.
  Actualizamos sus propiedades.

  PASO 2: REINICIAR EL MODO EDICIÓN

  Vaciamos idCitaEditar.
  Ponemos editando en false.
  Vaciamos nombreDoctorCita.

  RESULTADO:
  El formulario vuelve a estar preparado
  para crear una cita nueva.
*/
function limpiarFormulario() {
  Object.assign(novaCita, {
    doctorId: doctorStore.doctorId,
    fecha: "",
    hora: "",
    motivo: "",
    observacions: "",
    estado: "pendente",
  });

  idCitaEditar.value = "";
  editando.value = false;
  nombreDoctorCita.value = "";
}

/*
  FUNCIÓN: limpiarTodo()

  OBJETIVO:
  Limpiar tanto el formulario como los datos
  seleccionados en Pinia.

  PASO A PASO:
  1. limpiarFormulario() vacía los campos de la cita.
  2. pacienteStore.limpiarPaciente() elimina de Pinia
     los datos del paciente seleccionado.
  3. doctorStore.limpiarDoctor() elimina de Pinia
     los datos del doctor seleccionado.

  DIFERENCIA IMPORTANTE:

  limpiarFormulario():
  Limpia únicamente los datos del formulario.

  limpiarTodo():
  Limpia el formulario y también la selección
  del paciente y del doctor.
*/
function limpiarTodo() {
  limpiarFormulario();
  pacienteStore.limpiarPaciente();
  doctorStore.limpiarDoctor();
}
</script>

<style scoped>
.xestion-citas {
  width: 100%;
  padding: 0.5rem 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  margin-top: 1rem;
}

h4 {
  margin: 0 0 1.2rem;
  padding: 0.7rem 1rem;
  background-color: #89fcbd;
  color: #174d32;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.fila {
  display: grid;
  gap: 1rem;
  align-items: center;
}

.fila-principal {
  grid-template-columns: 1fr 1fr 1.5fr 1.5fr auto;
}

.fila-secundaria {
  grid-template-columns: 1.1fr 0.8fr 2fr 1fr;
}

.campo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.campo label {
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  color: #333;
}

.campo input,
.campo select,
textarea {
  width: 100%;
  min-width: 0;
  height: 38px;
  padding: 0.5rem;
  border: 1px solid #aaa;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 0.85rem;
  background-color: white;
}

.campo input[readonly] {
  background-color: #f3f7f5;
}

textarea {
  height: 80px;
  resize: vertical;
}

.botones-formulario {
  display: flex;
  justify-content: center;
}

.btn-guardar {
  min-width: 130px;
  padding: 0.55rem 1.8rem;
  background-color: #89fcbd;
  color: #174d32;
  border: 1px solid #5fcf91;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-guardar:hover:not(:disabled) {
  background-color: #70e9a9;
}

.btn-guardar:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-limpiar {
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
.btn-actualizar {
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid #000000;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
}

.btn-limpiar:hover {
  background-color: #c8cac9;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.btn-actualizar:hover {
  background-color: #c8cac9;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.titulo-listado {
  position: relative;
}

.btn-actualizar {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 0.85rem;
}

th,
td {
  padding: 0.7rem 0.6rem;
  border: 1px solid #e1e1e1;
  text-align: center;
  overflow-wrap: anywhere;
}

th {
  background-color: #f3f7f5;
  color: #333;
}

tbody tr:nth-child(even) {
  background-color: #fafafa;
}

.acciones button {
  margin: 0 2px;
  padding: 0.4rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.mensaje {
  padding: 1rem;
  text-align: center;
  color: #777;
}

@media (max-width: 1100px) {
  .fila-principal,
  .fila-secundaria {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .xestion-citas {
    padding: 1rem;
  }

  .fila-principal,
  .fila-secundaria {
    grid-template-columns: 1fr;
  }

  .tabla-contenedor {
    overflow-x: auto;
  }

  table {
    min-width: 650px;
  }
}
</style>