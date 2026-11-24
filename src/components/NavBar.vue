
<template>
  <!--
    BARRA DE NAVEGACIÓN

    <nav> es una etiqueta semántica HTML que
    identifica una sección de navegación.

    class="navbar" aplica los estilos CSS
    definidos más abajo.
  -->
  <nav class="navbar">

    <!--
      LOGOTIPO

      RouterLink es un componente de Vue Router.

      to="/" indica que, al pulsar el logotipo,
      navegamos a la página principal.

      A diferencia de un enlace HTML tradicional,
      RouterLink permite navegar dentro de la SPA
      sin recargar toda la página.

      <img> muestra el archivo logo.png.
    -->
    <div class="logo">
      <RouterLink to="/"><img src="/logo.png" alt="logo"></RouterLink>
    </div>

    <!--
      BOTÓN HAMBURGUESA

      Se utiliza para abrir y cerrar el menú
      en pantallas pequeñas.

      @click:
      Es la forma abreviada de v-on:click.

      Ejecuta una expresión cuando el usuario
      pulsa el botón.

      isOpen = !isOpen:
      Invierte el valor booleano de isOpen.

      Si isOpen es false, pasa a true.
      Si isOpen es true, pasa a false.

      Vue permite utilizar directamente isOpen
      en el template, aunque esté creado con ref().
    -->

    <!-- NUEVO -->
    <button class="hamburger" @click="isOpen = !isOpen">☰</button>

    <!--
      MENÚ DE NAVEGACIÓN

      :class es la abreviatura de v-bind:class.

      Permite asignar clases CSS dinámicamente.

      ['menu', { open: isOpen }] contiene:

      'menu':
      Clase que siempre estará aplicada.

      { open: isOpen }:
      Añade la clase "open" cuando isOpen es true.

      EJEMPLO:

      isOpen = false:
      <ul class="menu">

      isOpen = true:
      <ul class="menu open">

      Esto permite mostrar u ocultar el menú
      utilizando las reglas CSS responsive.
    -->

    <!-- MODIFICADO -->
    <ul :class="['menu', { open: isOpen }]">
      <li><RouterLink to="/">Inicio</RouterLink></li>
      <!-- Enlace al componente de gestión de pacientes. -->
      <li><RouterLink to="/xestion-pacientes">Pacientes</RouterLink></li>

      <!-- Enlace al componente de gestión de doctores. -->
      <li><RouterLink to="/xestion-doctores">Doctores</RouterLink></li>

      <!-- Enlace al componente de gestión de citas. -->
      <li><RouterLink to="/xestion-citas">Citas</RouterLink></li>
      <!-- Enlace a la página Sobre nós. -->
      <li><RouterLink to="/sobrenos">Sobre nós</RouterLink></li>
      <li><RouterLink to="/vista-acceso">Acceso</RouterLink></li>
    </ul>
  </nav>
</template>

<script setup>
/*
  IMPORTACIÓN DE REF

  ref() permite crear variables reactivas.

  Cuando una variable reactiva cambia,
  Vue actualiza automáticamente las partes
  del template que dependen de ella.
*/
import { ref } from "vue"; // será boolean

/*
  VARIABLE REACTIVA: isOpen

  Guarda si el menú hamburguesa está abierto.

  false:
  El menú está cerrado inicialmente.

  true:
  El menú está abierto.

  En JavaScript, para acceder al valor de un ref,
  normalmente utilizaríamos isOpen.value.

  En el template, Vue lo desenvuelve automáticamente,
  por lo que escribimos directamente isOpen.

  Esta variable cambia cuando pulsamos el botón:

  @click="isOpen = !isOpen"
*/
const isOpen = ref(false); // actívase cuando fago click
</script>

<style scoped>
/*
  scoped significa que Vue aplica estos estilos
  únicamente a los elementos de este componente.

  Esto evita que las reglas CSS afecten
  accidentalmente a otros componentes.
*/

/*
  .navbar

  display: flex:
  Organiza los elementos mediante Flexbox.

  justify-content: space-between:
  Separa el logotipo y el menú horizontalmente.

  align-items: center:
  Centra los elementos verticalmente.

  text-align: center:
  Centra el texto.

  width: 100%:
  Ocupa todo el ancho disponible.

  height: 70px:
  Establece una altura fija.

  padding:
  Añade espacio interior.

  box-sizing: border-box:
  Incluye el padding y los bordes
  dentro del ancho total.

  background y color:
  Definen el fondo verde y el texto blanco.
*/
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  width: 100%;
  height: 70px;

  padding: 0.1rem 6rem;
  box-sizing: border-box;

  background: #4f976f;
  color: white;
}

/*
  .logo

  font-weight: bold:
  Texto en negrita.

  font-size:
  Tamaño del texto.
*/
.logo {
  font-weight: bold;
  font-size: 1rem;
}

/*
  .menu

  display: flex:
  Coloca los elementos de la lista en horizontal.

  gap:
  Establece separación entre elementos.

  list-style: none:
  Elimina las viñetas de la lista.
*/
.menu {
  display: flex;
  gap: 0.8rem;
  list-style: none;
}

/*
  .menu a

  Selecciona los enlaces <a> que están
  dentro de un elemento con clase menu.

  color: white:
  Texto blanco.

  text-decoration: none:
  Elimina el subrayado de los enlaces.

  font-weight: 500:
  Establece el grosor del texto.
*/
.menu a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

/*
  .router-link-active

  Vue Router añade automáticamente esta clase
  a los enlaces que corresponden a una ruta activa.

  Aquí se muestra una línea amarilla debajo
  del enlace activo.
*/
.menu a.router-link-active {
  border-bottom: 0.2rem solid #ffe66d;
}

/*
  BOTÓN HAMBURGUESA

  display: none:
  Lo oculta en pantallas grandes.

  background: none:
  Elimina el fondo del botón.

  border: none:
  Elimina su borde.

  color: white:
  Color del icono.

  font-size:
  Tamaño del símbolo ☰.
*/

/* NUEVO */
.hamburger {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
}

/*
  MEDIA QUERY

  @media (max-width: 768px):

  Estas reglas se aplican cuando el ancho
  de la ventana es de 768 píxeles o menos.

  OBJETIVO:
  Adaptar la navegación a móviles y tablets.

  PASO 1:
  Mostramos el botón hamburguesa.

  PASO 2:
  Ocultamos inicialmente el menú.

  PASO 3:
  Cuando Vue añade la clase open,
  mostramos el menú con display: flex.
*/

/* NUEVO (responsive) */
@media (max-width: 768px) {

  /*
    En pantallas pequeñas, el botón
    hamburguesa pasa a ser visible.
  */
  .hamburger {
    display: block;
  }

  /*
    MENÚ MÓVIL

    display: none:
    Inicialmente está oculto.

    position: absolute:
    Lo posiciona fuera del flujo normal.

    top y right:
    Definen su posición.

    flex-direction: column:
    Coloca los enlaces verticalmente.

    background:
    Color de fondo del menú móvil.

    padding:
    Espacio interior.
  */
  .menu {
    display: none;
    position: absolute;
    top: 50px;
    right: 0;
    flex-direction: column;
    background: #1b4965;
    padding: 1rem;
  }

  /*
    .menu.open

    Este selector exige que el elemento
    tenga ambas clases: menu y open.

    La clase open se añade mediante :class
    cuando isOpen es true.

    display: flex hace visible el menú.
  */
  .menu.open {
    display: flex;
  }
}
</style>
