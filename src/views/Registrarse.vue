<template>
  <div class="w-full px-6 pt-24 flex justify-center items-center h-screen">
    <div class="p-6 bg-white shadow-lg rounded-md">
      <div class="text-center text-xl">
        Acceder
      </div>
      <form @submit.prevent="registrarse(user)">
        <div class="py-3 text-left">
          <label class="w-full text-left" for="nombre">Nombre</label>
          <input
            class="w-full text-left border-gray-100 border py-2 px-1 bg-gray-50"
            type="text"
            name="nombre"
            id="nombre"
            v-model="user.nombre"
          />
        </div>
        <div class="py-3 text-left">
          <label class="w-full text-left" for="usuario">Apellido</label>
          <input
            class="w-full text-left border-gray-100 border py-2 px-1 bg-gray-50"
            type="text"
            name="apellido"
            id="apellido"
            v-model="user.apellido"
          />
        </div>
        <div class="py-3 text-left">
          <label class="w-full text-left" for="usuario">Email</label>
          <input
            class="w-full text-left border-gray-100 border py-2 px-1 bg-gray-50"
            type="text"
            name="Email"
            id="Email"
            v-model="user.email"
          />
        </div>
        <div class="py-3 text-left">
          <label class="w-full text-left" for="usuario">Usuario</label>
          <input
            class="w-full text-left border-gray-100 border py-2 px-1 bg-gray-50"
            type="text"
            name="usuario"
            id="usuario"
            v-model="user.usuario"
          />
        </div>
        <div class="py-3 text-left">
          <label class="w-full text-left" for="password">Contaseña</label>
          <input
            class="w-full text-left border-gray-100 border py-2 px-1 bg-gray-50"
            type="password"
            name="password"
            id="password"
            v-model="user.password"
          />
        </div>
        <div class="py-3 text-center w-full">
          <button class="w-full p-3 bg-gray-800 text-white">Aceptar</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
export default Vue.extend({
  data() {
    return {
      user: {
        nombre: "",
        apellidos: "",
        email: "",
        usuario: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      registrarse: "user/registrarse",
    }),
  },
});
</script>
