<template>
  <div id="app" class="bg-gray-100 min-h-screen">
    <Navbar />
    <router-view />
    <div class="fixed bottom-2.5 z-10" v-if="alerts">
      <Alert v-for="(alert, index) in alerts" :key="index" :alert="alert" />
    </div>
  </div>
</template>
<script>
import Navbar from "./components/navbar/navbar.vue";
import Alert from "./components/Alerts.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    Navbar,
    Alert,
  },
  computed: {
    ...mapGetters({
      alerts: "alert/GET_ALERTS",
    }),
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
