import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwindcss.css";

Vue.config.productionTip = false;

// router middleware
router.beforeEach(async (to, from, next) => {
  let auth = null;
  await store.dispatch("user/getUserLog");
  auth = store.state.user.auth;

  if (to.matched.some((route) => route.meta.requireAuth)) {
    if (auth) {
      next();
    } else {
      next("/acceder");
    }
  } else if (auth) {
    next("/");
  }
  next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
