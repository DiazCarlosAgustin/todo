<template>
  <div
    class="text-left md:text-md w-full md:w-64 bg-white shadow-lg md:right-0 md:mr-3 py-2 overflow-y-auto"
  >
    <div v-if="!notificaciones">
      No hay notificaciones disponible.
    </div>
    <div v-else>
      <div
        class="border-l-2 hover:bg-gray-50 cursor-pointer border-green-500 p-2"
        v-for="(notificacion, index) in notificaciones"
        :key="index"
      >
        <span>{{ notificacion.mensaje }}</span>
        <div class="flex justify-end" v-if="notificacion.type === 'solicitud'">
          <span
            class="text-gray-600 px-2 text-right text-md"
            @click="
              updateSolicitud({ friend_id: notificacion.sendBy, aceptado: 1 })
            "
            >Rechazar</span
          >
          <span
            class="text-blue-500 px-2 text-right text-md"
            @click="
              updateSolicitud({ friend_id: notificacion.sendBy, aceptado: 0 })
            "
            >Aceptar</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
export default Vue.extend({
  data() {
    return {};
  },
  async mounted() {
    await this.getNotificaciones();
  },
  methods: {
    ...mapActions({
      getNotificaciones: "notificacion/get_notificaciones",
      updateSolicitud: "friend/updateSolicitud",
    }),
  },
  computed: {
    ...mapGetters({
      notificaciones: "notificacion/GET_NOTIFICACIONES",
    }),
  },
});
</script>

<style scoped></style>
