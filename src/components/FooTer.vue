
<template>
  <!--
    PIE DE PÁGINA

    <footer> es una etiqueta semántica HTML.

    Tiene dos clases:
    footer-content y footer.

    Ambas aportan estilos CSS al elemento.
  -->
  <footer class="footer-content footer">

    <!--
      ENLACE AL AVISO LEGAL

      router-link:
      Componente de Vue Router para navegar
      sin recargar toda la aplicación.

      class="aviso-legal":
      Aplica los estilos del enlace.

      to="/avisolegal":
      Indica la ruta de destino.

      target="_blank":
      Abre el enlace en una pestaña nueva.
    -->
    <router-link class="aviso-legal" to="/avisolegal" target="_blank"
      >Aviso Legal</router-link
    >

    <!--
      INTERPOLACIÓN DE VUE

      {{ }} permite mostrar el resultado
      de una expresión JavaScript en el HTML.

      new Date():
      Crea un objeto con la fecha y hora actuales.

      getFullYear():
      Obtiene el año con cuatro cifras.

      EJEMPLO:
      Si estamos en 2026, mostrará:

      © 2026 Sanidade Teis - Desenvolvido en Vue

      IMPORTANTE:
      No tenemos que escribir el año manualmente.
    -->
    <p>© {{ new Date().getFullYear() }} Sanidade Teis - Desenvolvido en Vue</p>
  </footer>
</template>

<!--
  SCRIPT VACÍO

  Este componente no necesita variables,
  funciones ni importaciones propias.

  La fecha se calcula directamente
  mediante una expresión del template.
-->
<script setup></script>

<style scoped>
/*
  scoped limita estos estilos
  al componente actual.
*/

/*
  ESTILOS DEL FOOTER

  background:
  Color de fondo verde.

  color:
  Texto blanco.

  text-align:
  Centra el texto.

  padding:
  Espacio interior.

  margin-top:
  Margen superior.

  font-size:
  Tamaño del texto.

  font-weight:
  Texto en negrita.

  height y width:
  Dimensiones del footer.

  position: fixed:
  Lo fija respecto a la ventana.

  bottom: 0:
  Lo coloca en la parte inferior
  de la ventana.
*/
.footer {
  background: #4f976f;
  color: white;
  text-align: center;
  padding: 0.2rem 1rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  font-weight: bold;
  height: 40px;
  width: 1087px;
  position: fixed;
  bottom: 0;
}

/*
  DISTRIBUCIÓN DEL CONTENIDO

  display: flex:
  Activa Flexbox.

  justify-content: center:
  Centra horizontalmente los elementos.

  align-items: center:
  Los alinea verticalmente.

  gap: 5rem:
  Establece separación entre el enlace
  y el texto.
*/
.footer-content {
  display: flex;
  justify-content: center; /* centra horizontalmente */
  align-items: center; /* alinea verticalmente na mesma liña */
  gap: 5rem; /* espazo entre o texto e o enlace */
}

/*
  COLOR DEL ENLACE

  Aplica el color blanco al enlace
  del aviso legal.
*/
.aviso-legal {
  color: white;
}

/*
  PSEUDOCLASE :hover

  Aplica este color cuando el usuario
  coloca el cursor sobre el enlace.
*/
.aviso-legal:hover {
  color: rgb(6, 95, 46);
}
</style>
