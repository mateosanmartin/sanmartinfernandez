
<template>
  <!--
    PÁGINA DE ERROR 404

    Este componente se muestra cuando
    Vue Router no encuentra una ruta válida.

    <h2>:
    Muestra el mensaje de error.

    <img>:
    Muestra una imagen del error 404.

    src="../assets/404.png":
    Ruta relativa a la imagen.

    style:
    Define estilos CSS directamente
    en el elemento HTML.

    width: 400px:
    Ancho de la imagen.

    height: 500px:
    Alto de la imagen.
  -->
  <h2>A páxina que buscas non se atopa</h2>
  <img src="../assets/404.png" style="width: 400px; height: 500px" />
</template>

<!--
  SCRIPT VACÍO

  No necesita variables ni funciones.

  Vue Router decide cuándo mostrar
  este componente según la URL.
-->
<script setup></script>

<!--
  STYLE VACÍO

  No hay reglas CSS propias.

  La imagen utiliza estilos inline
  definidos directamente en el template.
-->
<style scoped></style>
