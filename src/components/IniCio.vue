<template>
  <main class="inicio">
    <section class="hero">
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

      <!-- Capa oscura -->
      <div class="capa-oscura"></div>

      <!-- Contenido principal -->
      <div class="contenido">
        <h1>Bienvenido a Sanidad Teis</h1>

        <div class="linea"></div>

        <p>Tu salud, nuestra prioridad.</p>
      </div>
    </section>
  </main>
</template>

<script setup>
</script>


<style scoped>


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
/* VÍDEO DE FONDO */
.video-fondo {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;
  z-index: 0;
}

/* CAPA OSCURA */
.capa-oscura {
  position: absolute;
  inset: 0;

  background: rgba(0, 0, 0, 0.48);
  z-index: 1;
}

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

.contenido h1 {
  margin: 0;
  font-size: clamp(2.5rem, 5.5vw, 5.5rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: 1px;
  color: white;
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.45);
}

/* LÍNEA VERDE */
.linea {
  width: 100px;
  height: 5px;
  margin: 30px auto;
  background-color: #89fcbd;
  border-radius: 5px;
}

.contenido p {
  margin: 0;
  font-size: clamp(1.1rem, 2vw, 1.7rem);
  letter-spacing: 2px;
  color: #f5f5f5;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

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
