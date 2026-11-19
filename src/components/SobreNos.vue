
<template>
  <!-- Contenedor principal de la página Sobre nós. -->
  <div class="sobre-nos">
    <h4>Sobre nós</h4>

    <!-- Texto introductorio del componente. -->
    <p class="introduccion">
      En Sanidade Teis cuidamos de tu salud con una atención cercana,
      profesional y personalizada.
    </p>

    <!--
      CONTENEDOR DE TARJETAS

      Este div utiliza CSS Grid para organizar
      las tarjetas en varias columnas.
    -->
    <div class="contenedor-tarjetas">

      <!--
        DIRECTIVA v-for

        v-for="tarjeta in tarjetas":
        Recorre el array tarjetas definido en el script.

        Por cada elemento del array, Vue genera
        un div con la clase tarjeta.

        :key="tarjeta.id":
        Asigna una clave única a cada elemento.

        La clave permite que Vue identifique
        correctamente los elementos al actualizar
        la lista.

        IMPORTANTE:
        :key es la abreviatura de v-bind:key.

        class="tarjeta":
        Aplica los estilos CSS de cada tarjeta.
      -->
      <div
        v-for="tarjeta in tarjetas"
        :key="tarjeta.id"
        class="tarjeta"
      >
        <!--
          IMAGEN DINÁMICA

          :src="tarjeta.imagen":
          Utiliza el valor de la propiedad imagen
          del objeto tarjeta como ruta de la imagen.

          :alt="tarjeta.titulo":
          Utiliza el título de la tarjeta como
          texto alternativo.

          El símbolo : es la abreviatura
          de la directiva v-bind.

          EJEMPLO:
          Si tarjeta.imagen vale "/centro.jpg",
          Vue utiliza esa ruta para mostrar la imagen.
        -->
        <img
          :src="tarjeta.imagen"
          :alt="tarjeta.titulo"
          class="imagen-tarjeta"
        />

        <!-- Contenido textual y botón de la tarjeta. -->
        <div class="contenido-tarjeta">

          <!--
            INTERPOLACIÓN

            {{ tarjeta.titulo }} muestra
            el título de la tarjeta actual.

            {{ tarjeta.descripcion }} muestra
            su descripción.

            Vue sustituye las expresiones
            por los valores correspondientes.
          -->
          <h5>{{ tarjeta.titulo }}</h5>
          <p>{{ tarjeta.descripcion }}</p>

          <!--
            EVENTO @click

            @click es la abreviatura de v-on:click.

            Al pulsar el botón se ejecuta
            abrirInformacion(tarjeta).

            Le pasamos como argumento el objeto
            de la tarjeta sobre la que pulsamos.

            La función guardará ese objeto
            en tarjetaSeleccionada.
          -->
          <button
            class="btn-informacion"
            @click="abrirInformacion(tarjeta)"
          >
            Más información
          </button>
        </div>
      </div>
    </div>

    <!--
      MODAL DE INFORMACIÓN

      v-if="tarjetaSeleccionada":
      Muestra este div solamente cuando
      tarjetaSeleccionada tiene un valor truthy.

      Inicialmente tarjetaSeleccionada es null,
      por lo que el modal no aparece.

      Cuando seleccionamos una tarjeta,
      la variable contiene un objeto y el modal
      se muestra automáticamente.

      @click.self="cerrarInformacion":
      Ejecuta cerrarInformacion solamente cuando
      pulsamos directamente sobre el fondo.

      El modificador .self evita que se cierre
      al pulsar sobre elementos hijos, como
      el contenido interior del modal.

      IMPORTANTE:
      v-if crea o elimina el elemento del DOM
      dependiendo de la condición.
    -->
    <div
      v-if="tarjetaSeleccionada"
      class="fondo-modal"
      @click.self="cerrarInformacion"
    >
      <!-- Ventana interior del modal. -->
      <div class="modal-informacion">

        <!--
          BOTÓN DE CIERRE

          @click ejecuta cerrarInformacion().

          &times; es una entidad HTML que
          representa el símbolo ×.
        -->
        <button class="cerrar-modal" @click="cerrarInformacion">
          &times;
        </button>

        <!--
          DATOS DE LA TARJETA SELECCIONADA

          Mostramos las propiedades titulo
          e informacion del objeto guardado
          en tarjetaSeleccionada.

          En el template no necesitamos escribir
          tarjetaSeleccionada.value porque Vue
          desenvuelve automáticamente los ref.
        -->
        <h5>{{ tarjetaSeleccionada.titulo }}</h5>
        <p>{{ tarjetaSeleccionada.informacion }}</p>

        <!-- Otro botón para cerrar el modal. -->
        <button class="btn-informacion" @click="cerrarInformacion">
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/*
  IMPORTACIÓN DE REF

  ref() permite crear variables reactivas.

  Cuando cambia su valor, Vue actualiza
  automáticamente el template.
*/
import { ref } from "vue";

/*
  VARIABLE REACTIVA: tarjetaSeleccionada

  Inicialmente vale null.

  null indica que no hay ninguna tarjeta
  seleccionada y, por tanto, el modal
  debe permanecer cerrado.

  Cuando guardamos un objeto en esta variable,
  v-if permite mostrar el modal.

  Cuando vuelve a null, el modal desaparece.
*/
const tarjetaSeleccionada = ref(null);

/*
  ARRAY DE TARJETAS

  tarjetas es un array de objetos JavaScript.

  Cada objeto representa una tarjeta informativa.

  PROPIEDADES:

  id:
  Identificador único utilizado por :key.

  titulo:
  Nombre que aparece en la tarjeta.

  imagen:
  Ruta de la imagen correspondiente.

  descripcion:
  Texto breve mostrado en la tarjeta.

  informacion:
  Texto ampliado que aparece dentro del modal.

  IMPORTANTE:
  Este array es estático.

  No se obtiene mediante una petición al backend.

  Como no se modifica desde el componente,
  no necesita estar definido mediante ref().
*/
const tarjetas = [
  {
    id: 1,
    titulo: "Nuestro centro",
    imagen: "/centro.jpg",
    descripcion: "Un espacio dedicado al bienestar y a la atención sanitaria de nuestros pacientes.",
    informacion: "Sanidade Teis es un proyecto educativo que representa un centro sanitario moderno, orientado a facilitar la gestión de pacientes, doctores y citas médicas."
  },
  {
    id: 2,
    titulo: "Nuestros profesionales",
    imagen: "/profesionales.jpg",
    descripcion: "Profesionales de diferentes especialidades médicas.",
    informacion: "Nuestra aplicación permite consultar y gestionar profesionales de distintas especialidades, facilitando la organización de los servicios sanitarios."
  },
  {
    id: 3,
    titulo: "Atención al paciente",
    imagen: "/atencion.jpg",
    descripcion: "Una atención cercana y adaptada a las necesidades de cada paciente.",
    informacion: "La plataforma facilita el registro, la consulta y la actualización de los datos de los pacientes."
  },
  {
    id: 4,
    titulo: "Servicios médicos",
    imagen: "/serviciosmedicos.jpg",
    descripcion: "Diferentes especialidades para una atención sanitaria completa.",
    informacion: "Sanidade Teis incluye especialidades como cardiología, pediatría, dermatología, traumatología, neurología y oftalmología."
  },
  {
    id: 5,
    titulo: "Gestión de citas",
    imagen: "/citas.jpg",
    descripcion: "Organización sencilla y eficiente de las citas médicas.",
    informacion: "El sistema permite relacionar pacientes con profesionales médicos para facilitar la organización de las consultas."
  },
  {
    id: 6,
    titulo: "Nuestro compromiso",
    imagen: "/compromiso.jpg",
    descripcion: "Comprometidos con la calidad, la confianza y el bienestar.",
    informacion: "Sanidade Teis busca representar una gestión sanitaria accesible, organizada y respetuosa con la confidencialidad de los datos."
  }
];

/*
  FUNCIÓN: abrirInformacion(tarjeta)

  OBJETIVO:
  Abrir el modal con los datos de la tarjeta
  que ha seleccionado el usuario.

  PARÁMETRO:
  tarjeta: objeto correspondiente a la tarjeta
  sobre la que hemos pulsado.

  PASO A PASO:

  1. Recibimos el objeto tarjeta.
  2. Lo guardamos en tarjetaSeleccionada.value.
  3. Como la variable deja de ser null,
     la condición del v-if pasa a ser verdadera.
  4. Vue muestra el modal.
  5. El modal utiliza las propiedades titulo
     e informacion de la tarjeta seleccionada.

  EJEMPLO:
  abrirInformacion(tarjetas[0]);

  Abriría la información de "Nuestro centro".
*/
function abrirInformacion(tarjeta) {
  tarjetaSeleccionada.value = tarjeta;
}

/*
  FUNCIÓN: cerrarInformacion()

  OBJETIVO:
  Cerrar el modal.

  PASO A PASO:

  1. Establecemos tarjetaSeleccionada.value en null.
  2. La condición del v-if deja de cumplirse.
  3. Vue elimina el modal del DOM.

  Esta función se ejecuta:
  - Al pulsar el botón ×.
  - Al pulsar el botón Cerrar.
  - Al pulsar directamente sobre el fondo oscuro.

  IMPORTANTE:
  No eliminamos ninguna tarjeta del array.
  Solo limpiamos la selección.
*/
function cerrarInformacion() {
  tarjetaSeleccionada.value = null;
}
</script>

<style scoped>
/*
  scoped limita los estilos CSS
  a este componente Vue.
*/

/*
  CONTENEDOR PRINCIPAL

  width: 100%:
  Ocupa todo el ancho disponible.

  padding:
  Añade espacio interior.

  background:
  Fondo blanco.

  border-radius:
  Redondea las esquinas.

  box-shadow:
  Añade una sombra.

  box-sizing: border-box:
  Incluye el padding y los bordes dentro
  de las dimensiones del elemento.

  margin:
  Añade separación exterior.
*/

/* CONTENEDOR PRINCIPAL */
.sobre-nos {
  width: 100%;
  padding: 0.5rem 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  margin-top: 1rem;
  margin-bottom: 60px;

}

/*
  TÍTULO H4

  Este selector aplica estilos al h4
  que se encuentra dentro de .sobre-nos.

  Se utiliza un fondo verde claro,
  texto verde oscuro y bordes redondeados.
*/

/* MISMO H4 QUE AVISO LEGAL */
.sobre-nos h4 {
  margin: 0 0 25px;
  padding: 12px 15px;

  background-color: #89fcbd;
  color: #174d32;

  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 600;
}

/*
  TÍTULOS H5

  Se aplican a los títulos de las tarjetas
  y al título del modal.
*/

/* TÍTULOS H5 */
.sobre-nos h5 {
  margin: 0 0 15px;
  color: #174d32;
  font-size: 1rem;
  font-weight: 600;
}

/*
  PÁRRAFOS

  line-height: 1.6:
  Establece la altura de línea.

  font-size:
  Tamaño de letra.

  color:
  Color del texto.
*/

/* PÁRRAFOS */
.sobre-nos p {
  margin-bottom: 15px;
  line-height: 1.6;
  color: #333;
  font-size: 0.95rem;
}

/*
  INTRODUCCIÓN

  text-align: center:
  Centra el texto.

  !important:
  Da prioridad a esta declaración
  de margen frente a otras reglas
  que podrían entrar en conflicto.
*/
.introduccion {
  text-align: center;
  margin-bottom: 30px !important;
}

/*
  CONTENEDOR DE TARJETAS

  display: grid:
  Activa CSS Grid.

  grid-template-columns: repeat(3, 1fr):
  Crea tres columnas del mismo tamaño.

  1fr representa una fracción del espacio
  disponible dentro del grid.

  gap: 22px:
  Añade separación entre las tarjetas.
*/

/* TARJETAS */
.contenedor-tarjetas {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

/*
  TARJETA INDIVIDUAL

  display: flex:
  Activa Flexbox.

  flex-direction: column:
  Coloca la imagen encima del contenido.

  overflow: hidden:
  Oculta las partes que sobresalgan
  de los bordes redondeados.

  transition:
  Suaviza los cambios de transform
  y box-shadow al pasar el cursor.
*/
.tarjeta {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}

/*
  EFECTO HOVER

  :hover se aplica cuando el cursor
  está encima de la tarjeta.

  translateY(-4px):
  Desplaza la tarjeta 4px hacia arriba.

  También aumenta la sombra.
*/
.tarjeta:hover {
  transform: translateY(-4px);
  box-shadow: 0 7px 18px rgba(0, 0, 0, 0.16);
}

/*
  IMAGEN

  width: 100%:
  Ocupa todo el ancho de la tarjeta.

  height: 190px:
  Altura fija.

  object-fit: cover:
  Hace que la imagen cubra el espacio,
  recortando partes si es necesario.
*/
.imagen-tarjeta {
  width: 100%;
  height: 190px;
  object-fit: cover;
}

/*
  CONTENIDO DE LA TARJETA

  display: flex y flex-direction: column:
  Organizan el título, descripción y botón
  verticalmente.

  align-items: center:
  Centra los elementos horizontalmente.

  flex: 2:
  Define cómo participa el contenido
  en la distribución del espacio flexible.
*/
.contenido-tarjeta {
  padding: 20px;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 2;
}

/*
  flex: 1 permite que el párrafo ocupe
  el espacio flexible disponible.

  Esto ayuda a alinear los botones
  de las diferentes tarjetas.
*/
.contenido-tarjeta p {
  flex: 1;
}

/*
  BOTÓN DE INFORMACIÓN

  background:
  Color verde.

  border: none:
  Elimina el borde predeterminado.

  cursor: pointer:
  Muestra el cursor de mano al pasar
  por encima del botón.
*/

/* BOTONES */
.btn-informacion {
  background: #4eaa7a;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 0.95rem;
}

/* Cambia el fondo cuando el cursor pasa sobre el botón. */
.btn-informacion:hover {
  background: #368c61;
}

/*
  FONDO DEL MODAL

  position: fixed:
  Posiciona el modal respecto a la ventana.

  inset: 0:
  Equivale a top, right, bottom y left a 0.

  background: rgba(...):
  Crea una capa negra semitransparente.

  display: flex:
  Permite centrar la ventana del modal.

  align-items y justify-content:
  Centran el contenido vertical
  y horizontalmente.

  z-index: 2000:
  Sitúa el modal por encima de
  otros elementos de la página.
*/

/* MODAL */
.fondo-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 2000;
  padding: 20px;
}

/*
  VENTANA DEL MODAL

  max-width: 500px:
  Limita el ancho máximo.

  width: 100%:
  Permite adaptarse a pantallas pequeñas.

  position: relative:
  Sirve de referencia para posicionar
  el botón de cierre con position: absolute.
*/
.modal-informacion {
  background: white;
  padding: 30px;
  border-radius: 8px;

  max-width: 500px;
  width: 100%;
  box-sizing: border-box;

  position: relative;
  text-align: center;
}

/* Separación inferior del texto del modal. */
.modal-informacion p {
  margin-bottom: 25px;
}

/*
  BOTÓN × DEL MODAL

  position: absolute:
  Permite colocarlo en una posición concreta
  respecto a .modal-informacion.

  right: 15px:
  Lo separa 15px del borde derecho.

  top: 10px:
  Lo separa 10px del borde superior.
*/
.cerrar-modal {
  position: absolute;
  right: 15px;
  top: 10px;

  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #555;
}

/*
  RESPONSIVE PARA TABLETS

  Cuando la pantalla tiene 992px o menos,
  el grid pasa de tres columnas a dos.
*/

/* TABLET */
@media (max-width: 992px) {
  .contenedor-tarjetas {
    grid-template-columns: repeat(2, 1fr);
  }
}

/*
  RESPONSIVE PARA MÓVILES

  Cuando la pantalla tiene 600px o menos:

  - Ajustamos los márgenes y el padding.
  - Mostramos las tarjetas en una sola columna.
  - Aumentamos la altura de las imágenes a 200px.
*/

/* MÓVIL */
@media (max-width: 600px) {
  .sobre-nos {
    margin: 10px auto;
    padding: 20px 15px 30px;
  }

  .contenedor-tarjetas {
    grid-template-columns: 1fr;
  }

  .imagen-tarjeta {
    height: 200px;
  }
}
</style>
