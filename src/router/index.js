import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/indicadores",
    name: "Indicadores",
    meta: {
      auth: true,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Indicadores.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

import firebase from "firebase";

router.beforeEach((to, from, next) => {
  const user = firebase.auth().currentUser;
  const auth = to.meta.auth;
  if (auth && user) {
    next();
  } else if (auth && !user) {
    alert("Usted no tiene permisos para entrar aquí >:- ( ");
    next("/");
  } else {
    next();
  }
});

export default router;
