<template>
  <nav class="relative w-full h-full shadow-lg">
    <div class="bg-white h-16 w-full absolute inset-y-0 px-4 shadow-lg">
      <div class="flex justify-between items-center h-full">
        <router-link class="text-lg font-extrabold text-green-500 " to="/">
          ToDo
        </router-link>
        <template v-if="!auth">
          <router-link class="text-md text-green-500" to="/acceder">
            Acceder
          </router-link>
        </template>
        <template v-if="auth">
          <div class="flex items-center">
            <div class="px-3" @click="showNotificaciones = !showNotificaciones">
              <svg
                class="h-6 w-6 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <div class="px-3">
              <button class="text-green-500" @click="showOptions">
                {{ user.usuario }}
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>

    <Notificaciones
      v-if="showNotificaciones"
      class="min-h-0 h-auto max-h-64 top-16 absolute"
    />
    <div
      class="w-full md:w-32 bg-white shadow-lg h-10 flex justify-center items-center absolute top-16 md:right-0 md:mr-3"
      v-if="showOptionsUser"
    >
      <span
        @mouseleave="showOptionsUser = false"
        @click="cerrarSession"
        class="text-green-500"
        >Cerrar sesion</span
      >
    </div>
  </nav>
</template>
<script lang="ts">
import Vue from "vue";
import Notificaciones from "../notificaciones.vue";
import { mapGetters } from "vuex";
export default Vue.extend({
  data() {
    return {
      showOptionsUser: false,
      showNotificaciones: false,
    };
  },
  components: {
    Notificaciones,
  },
  methods: {
    cerrarSession() {
      this.$store.dispatch("user/cerrarSession");
    },
    showOptions() {
      this.showOptionsUser = !this.showOptionsUser;
    },
  },
  computed: {
    ...mapGetters({
      auth: "user/GET_AUTH",
      user: "user/GET_USER",
    }),
  },
});
</script>
