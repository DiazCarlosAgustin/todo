import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Index.vue";
import Acceder from "../views/Acceder.vue";
import Registrarse from "../views/Registrarse.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    meta: { requireAuth: true },
  },
  {
    path: "/acceder",
    component: Acceder,
  },
  {
    path: "/registrarse",
    component: Registrarse,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
