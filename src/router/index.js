import { createRouter, createWebHistory } from "vue-router";

import IniCio from "../components/IniCio.vue";
import XestionPacientes from "../components/XestionPacientes.vue";
import SobreNos from "../components/SobreNos.vue";
import NotFound from "../components/NotFound.vue";
import AvisoLegal from "../components/AvisoLegal.vue";
import PoliticaPrivacidad from "../components/PoliticaPrivacidad.vue";
import XestionDoctores from "../components/XestionDoctores.vue";

const routes = [
  { path: "/", name: IniCio, component: IniCio },
  {
    path: "/xestion-pacientes",
    name: XestionPacientes,
    component: XestionPacientes,
  },
  { path: "/sobrenos", name: SobreNos, component: SobreNos },
  { path: "/avisolegal", name: AvisoLegal, component: AvisoLegal },
  { path: "/:pathMatch(.*)*", name: NotFound, component: NotFound },
  {
    path: "/politicaprivacidad",
    name: PoliticaPrivacidad,
    component: PoliticaPrivacidad,
  },
  {
    path: "/xestion-doctores",
    name: XestionDoctores,
    component: XestionDoctores,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
