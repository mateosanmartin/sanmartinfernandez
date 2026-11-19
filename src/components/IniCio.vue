
<template>
  <!--
    CONTENEDOR PRINCIPAL

    <main> representa el contenido principal.

    class="inicio" aplica los estilos
    definidos en este componente.
  -->
  <main class="inicio">

    <!--
      SECCIÓN HERO

      Una sección hero es la zona destacada
      de presentación de una página web.

      Aquí contiene:
      1. Un vídeo de fondo.
      2. Una capa oscura.
      3. El texto de bienvenida.
    -->
    <section class="hero">

      <!--
        VÍDEO DE FONDO

        autoplay:
        Intenta reproducir el vídeo automáticamente.

        muted:
        Silencia el vídeo. También facilita
        que los navegadores permitan autoplay.

        loop:
        Vuelve a reproducir el vídeo al terminar.

        playsinline:
        Permite reproducirlo dentro de la página
        en dispositivos compatibles.

        preload="auto":
        Indica al navegador que puede precargar
        el vídeo.

        <source>:
        Define el archivo y su formato.

        src="/sanidad.mp4":
        Archivo servido desde la raíz pública.

        type="video/mp4":
        Indica el formato del vídeo.
      -->

      <!-- Vídeo de fondo -->
      <video
        class="video-fondo"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
      >
        <source src="/sanidad.mp4" type="video/mp4" />
      </video>

      <!--
        CAPA OSCURA

        Este div se coloca encima del vídeo
        para oscurecerlo y facilitar
        la lectura del texto.

        El efecto se consigue mediante
        position, z-index y background.
      -->

      <!-- Capa oscura -->
      <div class="capa-oscura"></div>

      <!--
        CONTENIDO CENTRAL

        h1:
        Título principal de la página.

        div.linea:
        Línea decorativa situada bajo el título.

        p:
        Texto descriptivo.
      -->

      <!-- Contenido principal -->
      <div class="contenido">
        <h1>Bienvenido a Sanidad Teis</h1>

        <div class="linea"></div>

        <p>Tu salud, nuestra prioridad.</p>
      </div>
    </section>
  </main>
</template>

<!--
  SCRIPT SETUP VACÍO

  Esta página no necesita lógica JavaScript.

  El vídeo se reproduce mediante atributos HTML
  y las animaciones se realizan mediante CSS.
-->
<script setup>
</script>


<style scoped>

/*
  CONTENEDOR PRINCIPAL

  flex: 1:
  Permite ocupar el espacio disponible.

  display: flex:
  Activa Flexbox.

  flex-direction: column:
  Coloca los elementos verticalmente.

  width: 100%:
  Ocupa todo el ancho.

  min-height: 0:
  Permite que el elemento flexible
  reduzca su altura.

  margin y padding:
  Eliminan espacios exteriores e interiores.

  overflow: hidden:
  Oculta el contenido que sobresalga.
*/
.inicio {
  flex: 1;
  display: flex;
  flex-direction: column;

  width: 100%;
  min-height: 0;

  margin: 0;
  padding: 0;
  overflow: hidden;
}

/*
  SECCIÓN HERO

  position: relative:
  Establece una referencia para posicionar
  los elementos absolute que contiene.

  flex: 1:
  Ocupa el espacio disponible.

  display: flex:
  Activa Flexbox.

  align-items: center:
  Centra verticalmente el contenido.

  justify-content: center:
  Centra horizontalmente el contenido.

  overflow: hidden:
  Evita que el vídeo sobresalga.

  background-color:
  Color de fondo que puede verse mientras
  carga el vídeo.
*/
.hero {
  position: relative;
  flex: 1;

  width: 100%;
  min-height: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
  background-color: #142b22;
}

/*
  VÍDEO DE FONDO

  position: absolute:
  Posiciona el vídeo respecto a .hero.

  inset: 0:
  Equivale a establecer top, right,
  bottom y left a 0.

  width y height:
  Ocupa todo el espacio del contenedor.

  object-fit: cover:
  Hace que el vídeo cubra todo el espacio,
  recortando partes si es necesario.

  z-index: 0:
  Sitúa el vídeo en la capa inferior.
*/

/* VÍDEO DE FONDO */
.video-fondo {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;
  z-index: 0;
}

/*
  CAPA OSCURA

  position: absolute:
  Se superpone al vídeo.

  inset: 0:
  Ocupa todo el contenedor.

  rgba(0, 0, 0, 0.48):
  Color negro con un 48 % de opacidad.

  z-index: 1:
  Sitúa la capa por encima del vídeo,
  pero por debajo del texto.
*/

/* CAPA OSCURA */
.capa-oscura {
  position: absolute;
  inset: 0;

  background: rgba(0, 0, 0, 0.48);
  z-index: 1;
}

/*
  CONTENIDO CENTRAL

  position: relative:
  Permite aplicar z-index.

  z-index: 2:
  Coloca el texto por encima del vídeo
  y de la capa oscura.

  width: 90%:
  Ocupa el 90 % del ancho disponible.

  max-width: 1100px:
  Limita su ancho máximo.

  text-align: center:
  Centra el texto.

  animation:
  Ejecuta la animación aparecer.

  1.5s:
  Duración de la animación.

  ease-out:
  Hace que termine suavemente.
*/

/* TEXTO CENTRAL */
.contenido {
  position: relative;
  z-index: 2;
  width: 90%;
  max-width: 1100px;
  text-align: center;
  color: white;
  animation: aparecer 1.5s ease-out;
}

/*
  TÍTULO PRINCIPAL

  clamp(2.5rem, 5.5vw, 5.5rem):
  Define un tamaño de fuente adaptable.

  2.5rem:
  Tamaño mínimo.

  5.5vw:
  Tamaño preferido según el ancho de la ventana.

  5.5rem:
  Tamaño máximo.

  font-weight: 800:
  Texto muy grueso.

  line-height:
  Altura de línea.

  letter-spacing:
  Separación entre letras.

  text-shadow:
  Añade una sombra al texto para
  mejorar su visibilidad.
*/
.contenido h1 {
  margin: 0;
  font-size: clamp(2.5rem, 5.5vw, 5.5rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: 1px;
  color: white;
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.45);
}

/*
  LÍNEA DECORATIVA

  width y height:
  Dimensiones de la línea.

  margin: 30px auto:
  Añade 30px arriba y abajo y centra
  horizontalmente el elemento.

  background-color:
  Color verde claro.

  border-radius:
  Redondea sus esquinas.
*/

/* LÍNEA VERDE */
.linea {
  width: 100px;
  height: 5px;
  margin: 30px auto;
  background-color: #89fcbd;
  border-radius: 5px;
}

/*
  TEXTO DESCRIPTIVO

  clamp():
  Ajusta el tamaño del texto a la pantalla.

  letter-spacing:
  Aumenta la separación entre letras.

  text-shadow:
  Mejora la legibilidad sobre el vídeo.
*/
.contenido p {
  margin: 0;
  font-size: clamp(1.1rem, 2vw, 1.7rem);
  letter-spacing: 2px;
  color: #f5f5f5;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

/*
  ANIMACIÓN CSS

  @keyframes define los pasos de una animación.

  from:
  Estado inicial.

  opacity: 0:
  El contenido empieza invisible.

  translateY(30px):
  Comienza desplazado 30px hacia abajo.

  to:
  Estado final.

  opacity: 1:
  El contenido se vuelve visible.

  translateY(0):
  Termina en su posición original.

  El resultado es un efecto de aparición
  con movimiento vertical.
*/

/* ANIMACIÓN */
@keyframes aparecer {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/*
  DISEÑO RESPONSIVE

  Estas reglas se aplican cuando la pantalla
  tiene un ancho de 768px o menos.

  Reducen el tamaño del título, del párrafo
  y de la línea decorativa.
*/
@media (max-width: 768px) {
  .contenido h1 {
    font-size: 2.5rem;
  }

  .contenido p {
    font-size: 1.1rem;
  }

  .linea {
    width: 70px;
    height: 4px;
    margin: 22px auto;
  }
}
</style>
