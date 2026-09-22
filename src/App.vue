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
:global(body) {
  margin: 0;
  background: #f6f6f6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* NAVBAR */
:global(nav) {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

/* CONTENIDO */
.main-content {
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
  box-sizing: border-box;
}

/* FOOTER */
:global(footer) {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

/* Móvil */
@media (max-width: 768px) {
  .main-content {
    padding-top: 70px;
    padding-bottom: 70px;
  }
}
</style>
