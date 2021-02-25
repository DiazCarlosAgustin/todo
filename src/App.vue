<template>
  <div id="app" class="bg-gray-100 min-h-screen">
    <Navbar />
    <router-view />
  </div>
</template>
<script>
import Navbar from "./components/navbar/navbar.vue";
export default {
  components: {
    Navbar,
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
