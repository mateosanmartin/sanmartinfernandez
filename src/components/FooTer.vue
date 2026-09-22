<template>
  <footer class="footer-content footer">
    <router-link class="aviso-legal" to="/avisolegal" target="_blank"
      >Aviso Legal</router-link
    >
    <p>© {{ new Date().getFullYear() }} Sanidad Teis - Desenvolvido en Vue</p>
  </footer>
</template>

<script setup></script>

<style scoped>
.footer {
  background: #4f976f;
  color: white;
  text-align: center;
  padding: 0.2rem 6rem;
  margin-top: 3rem;
  font-size: 0.9rem;
  height: 50px;
}

.footer-content {
  display: flex;
  justify-content: center; /* centra horizontalmente */
  align-items: center; /* alinea verticalmente na mesma liña */
  gap: 5rem; /* espazo entre o texto e o enlace */
}

.aviso-legal {
  color: white;
}

.aviso-legal:hover {
  color: blue;
}
</style>
