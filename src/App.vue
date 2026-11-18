<template>
  <div id="app">
    <NavBar />

    <main class="main-content">
      <router-view />
    </main>

    <FooTer />
  </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import FooTer from "./components/FooTer.vue";
</script>

<style>

body {
  margin: 0;
  background: #f6f6f6;
}

#app {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

/* NAVBAR FIJO ARRIBA */
nav {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  flex-shrink: 0;
}

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

/* FOOTER */
footer {
  position: relative;
  width: 100%;
  z-index: 10;
  flex-shrink: 0;
}

/* MÓVIL */
@media (max-width: 768px) {
  .main-content {
    padding: 0;
  }
}
</style>

