
/*
  IMPORTACIONES DEL FRONTEND

  createApp:
  Función de Vue que crea una aplicación.

  style.css:
  Hoja de estilos global.

  App.vue:
  Componente raíz de la aplicación.

  router:
  Configuración de navegación entre páginas.

  createPinia:
  Función que crea una instancia de Pinia
  para compartir estado entre componentes.
*/
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

/*
  CREAR PINIA

  createPinia() crea la instancia que utilizarán
  los stores de pacientes y doctores.

  Después se registra en la aplicación Vue
  mediante .use(pinia).
*/
const pinia = createPinia()

/*
  CREAR Y MONTAR LA APLICACIÓN

  createApp(App):
  Crea la aplicación utilizando App.vue
  como componente principal.

  .use(router):
  Instala Vue Router.

  .use(pinia):
  Instala Pinia.

  .mount("#app"):
  Monta la aplicación en el elemento HTML
  cuyo id sea "app".

  Ese elemento normalmente está en index.html:

  <div id="app"></div>

  IMPORTANTE:
  Los métodos se encadenan:
  createApp(...).use(...).use(...).mount(...)

  La aplicación empieza a renderizarse
  cuando se ejecuta mount().
*/
createApp(App).use(router).use(pinia).mount("#app");
