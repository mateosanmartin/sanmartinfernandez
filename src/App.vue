
<template>
  <!--
    COMPONENTE RAÍZ

    Este div contiene toda la aplicación.

    id="app" permite aplicar los estilos
    definidos para #app.
  -->
  <div id="app">

    <!--
      NAVBAR

      <NavBar /> muestra el componente
      de navegación superior.

      Está importado en el script setup.
    -->
    <NavBar />

    <!--
      CONTENIDO PRINCIPAL

      La etiqueta main representa el contenido
      principal de la página.

      class="main-content" aplica los estilos
      definidos más abajo.
    -->
    <main class="main-content">

      <!--
        ROUTER-VIEW

        Es un componente de Vue Router.

        Muestra automáticamente el componente
        correspondiente a la URL actual.

        EJEMPLOS:

        / -> IniCio.vue

        /xestion-pacientes -> XestionPacientes.vue

        /xestion-doctores -> XestionDoctores.vue

        /xestion-citas -> XestionCitas.vue

        IMPORTANTE:
        router-view no es una etiqueta HTML normal.
        La proporciona Vue Router.
      -->
      <router-view />
    </main>

    <!--
      FOOTER

      <FooTer /> muestra el componente
      del pie de página.

      Al estar fuera de router-view,
      permanece en todas las rutas.
    -->
    <FooTer />
  </div>
</template>

<script setup>
/*
  SCRIPT SETUP

  Es una sintaxis de Vue 3 Composition API.

  Permite importar componentes y utilizar
  directamente sus nombres en el template.

  No necesitamos escribir export default
  ni registrar manualmente components: {}.
*/

// Componente de navegación superior.
import NavBar from "./components/NavBar.vue";

// Componente del pie de página.
import FooTer from "./components/FooTer.vue";
</script>

<style>

/*
  ESTILOS GLOBALES DEL BODY

  margin: 0:
  Elimina el margen predeterminado del navegador.

  background:
  Establece el color de fondo de la página.
*/
body {
  margin: 0;
  background: #f6f6f6;
}

/*
  CONTENEDOR PRINCIPAL

  min-height: 100dvh:
  Establece una altura mínima equivalente
  al alto dinámico de la ventana.

  display: flex:
  Activa Flexbox.

  flex-direction: column:
  Coloca los elementos verticalmente.

  Esto organiza:
  1. Navbar.
  2. Contenido.
  3. Footer.
*/
#app {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

/*
  NAVBAR

  position: sticky:
  Permite que la barra quede adherida
  a la parte superior al desplazarnos.

  top: 0:
  La fija al borde superior cuando corresponde.

  width: 100%:
  Ocupa todo el ancho disponible.

  z-index: 1000:
  Establece su prioridad de superposición.

  flex-shrink: 0:
  Evita que Flexbox reduzca su tamaño.
*/

/* NAVBAR FIJO ARRIBA */
nav {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  flex-shrink: 0;
}

/*
  CONTENIDO PRINCIPAL

  display: flex:
  Utiliza Flexbox.

  flex-direction: column:
  Organiza los elementos verticalmente.

  align-items: stretch:
  Estira los elementos en el eje transversal.

  flex: 1:
  Permite que main ocupe el espacio
  disponible entre navbar y footer.

  width: 100%:
  Ocupa todo el ancho.

  min-height: 0:
  Permite que el elemento flexible
  reduzca su altura si es necesario.

  padding: 0:
  Elimina el relleno interior.

  box-sizing: border-box:
  Incluye padding y bordes dentro
  de las dimensiones del elemento.
*/

/* CONTENIDO */
.main-content {
  display: flex;
  flex-direction: column;
  align-items: stretch;

  flex: 1;
  width: 100%;
  min-height: 0;

  padding: 0;
  box-sizing: border-box;
}

/*
  FOOTER

  position: relative:
  Mantiene el elemento en el flujo normal,
  pero permite utilizar z-index.

  width: 100%:
  Ocupa todo el ancho disponible.

  z-index: 10:
  Define su nivel de superposición.

  flex-shrink: 0:
  Evita que Flexbox reduzca su altura.
*/

/* FOOTER */
footer {
  position: relative;
  width: 100%;
  z-index: 10;
  flex-shrink: 0;
}

/*
  MEDIA QUERY

  @media (max-width: 768px):
  Aplica los estilos interiores cuando
  la ventana tiene 768 píxeles de ancho o menos.

  Se utiliza para adaptar el diseño
  a pantallas más pequeñas.

  En este caso mantiene el padding
  del contenido principal en 0.
*/

/* MÓVIL */
@media (max-width: 768px) {
  .main-content {
    padding: 0;
  }
}
</style>
