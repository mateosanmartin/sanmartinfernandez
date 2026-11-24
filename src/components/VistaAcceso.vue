<template>
  <div class="vista-acceso">
    <h4>🔐 Acceso ao Sistema - Sanidad Teis</h4>
    <form @submit.prevent="handleLogin">

      <div class="campo">
        <label for="usuario">Usuario:</label>
        <input
          id="usuario"
          v-model="usuario"
          type="text"
          placeholder="Introduce o teu usuario"
          required
          aria-label="Usuario"
        />
      </div>

      <div class="campo">
        <label for="password">Contrasinal:</label>
        <div class="campo-password">
          <input
            id="password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Introduce o contrasinal"
            required
            aria-label="Contrasinal"
          />
          <button
            type="button"
            class="btn-ver"
            aria-label="Alternar visibilidade do contrasinal"
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? "Ocultar" : "Ver" }}
          </button>
        </div>
      </div>

      <div class="botones-formulario">
        <button
          type="submit"
          class="btn-guardar"
          :disabled="usuario.trim() === '' || password.trim() === ''"
        >
          Acceder
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const usuario = ref("");
const password = ref("");

const showPassword = ref(false);

function handleLogin() {
  console.log("Iniciando sesión co usuario:", usuario.value);
}
</script>

<style scoped>
.vista-acceso {
  width: 100%;
  max-width: 450px;
  margin: 2.5rem auto;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
}

h4 {
  margin: 0 0 1.5rem;
  padding: 0.7rem 1rem;
  background-color: #89fcbd;
  color: #174d32;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.campo label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #333;
}

.campo input {
  width: 100%;
  height: 38px;
  padding: 0.5rem;
  border: 1px solid #aaa;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 0.85rem;
  background-color: white;
}

.campo-password {
  position: relative;
  display: flex;
  align-items: center;
}

.campo-password input {
  padding-right: 4.5rem;
}

.btn-ver {
  position: absolute;
  right: 6px;
  padding: 0.25rem 0.6rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f3f3f3;
  font-size: 0.75rem;
  cursor: pointer;
}

.btn-ver:hover {
  background: #e2e2e2;
}

.botones-formulario {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}

.btn-guardar {
  min-width: 130px;
  padding: 0.55rem 1.8rem;
  background-color: #89fcbd;
  color: #174d32;
  border: 1px solid #5fcf91;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-guardar:hover:not(:disabled) {
  background-color: #70e9a9;
}

.btn-guardar:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
