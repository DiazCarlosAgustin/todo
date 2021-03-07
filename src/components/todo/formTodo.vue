<template>
  <form
    @submit.prevent="addNewTodo()"
    class="p-6 mb-5 bg-white shadow-lg max-w-sm text-green-400 font-semibold text-left rounded-md"
  >
    <div class="py-2 vincular-todo">
      <div class="flex justify-between">
        <label for="user">¿Asignar a otro usuario?</label>
        <input type="checkbox" v-model="vincularAUsuario" />
      </div>
      <input
        v-if="vincularAUsuario"
        v-model="username"
        @focus="focusInput = true"
        @clickOut="focusInput = false"
        @keyup="validarCambio"
        placeholder="Usuario"
        class=" text-black p-2 w-full rounded-md border border-gray-300 bg-gray-50 shadow-md"
        type="text"
        name="titulo"
        autocomplete="off"
        id="titulo"
      />
      <div
        class="w-full max-h-63 overflow-y-auto  bg-gray-50 shadow-md text-sm text-black "
      >
        <div
          class="element text-sm text-black p-3 hover:bg-gray-100 cursor-pointer"
          v-for="(friend, index) in filterFriends"
          :key="index"
          v-show="focusInput"
        >
          <span
            class="element text-sm text-black p-3 hover:bg-gray-100 cursor-pointer"
            v-if="friend"
            @click="setUser(friend)"
            >{{ friend.usuario }}</span
          >
        </div>
      </div>
    </div>
    <div class="py-2">
      <label for="titulo">Titulo</label>
      <input
        v-model="todo.titulo"
        class=" text-black p-2 w-full rounded-sm border border-gray-300 bg-gray-50 shadow-md"
        type="text"
        name="titulo"
        id="titulo"
      />
    </div>
    <div class="py-2">
      <label for="descripcion">Descripcion</label>
      <textarea
        v-model="todo.descripcion"
        class="w-full rounded-sm p-2 text-black border border-gray-300 bg-gray-50 shadow-md"
        name="descripcion"
        id="descripcion"
        cols="30"
        rows="10"
      ></textarea>
    </div>
    <div class="py-2">
      <label for="titulo">Progreso</label>
      <input
        v-model="todo.progreso"
        class=" text-black p-2 w-full rounded-sm border border-gray-300 bg-gray-50 appearance-none shadow-md"
        type="number"
        min="0"
        max="100"
        name="progreso"
        id="progreso"
      />
    </div>
    <div class="flex justify-end py-3">
      <button
        class="text-white hover:bg-green-600 bg-green-400 p-3 rounded-md w-full"
      >
        Agregar
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
export default Vue.extend({
  data() {
    return {
      vincularAUsuario: false,
      focusInput: false,
      username: "",
      lastSelected: null,
      todo: {
        titulo: "",
        descripcion: "",
        user: 0,
        fromUser: 0,
        progreso: 0,
      },
    };
  },
  async mounted() {
    await this.getFriends();
  },
  methods: {
    ...mapActions({
      crearTodo: "todo/add_todo",
      getFriends: "friend/getFriends",
      newAlert: "alert/addAlert",
    }),
    validarCambio() {
      if (this.todo.user != null) {
        if (this.username != this.lastSelected) {
          this.todo.user = null;
        }
      }
    },
    setUser(user) {
      this.focusInput = false;
      this.username = user.usuario;
      this.lastSelected = user.usuario;
      this.todo.user = user.id;
    },
    addNewTodo() {
      this.todo.fromUser = this.userDfault;
      if (this.todo.user === null) {
        this.newAlert({
          msg:
            "Debe de seleccionar un usuario o deseleccionar la opcion de vincular a otro usuario.",
          type: "danger",
        });
      }
      if (this.todo.user == 0 && this.vincularAUsuario == false) {
        this.todo.user = this.userDfault;
        this.crearTodo(this.todo);
        this.todo = {
          titulo: "",
          descripcion: "",
          user: 0,
          fromUser: 0,
          progreso: 0,
        };
      } else {
        this.crearTodo(this.todo);
        this.todo = {
          titulo: "",
          descripcion: "",
          user: 0,
          fromUser: 0,
          progreso: 0,
        };
      }
      this.username = "";
      this.validarCambio();
    },
  },
  computed: {
    ...mapGetters({
      userDfault: "user/GET_USER_ID",
      friends: "friend/GET_FRIENDS",
    }),
    filterFriends() {
      return this.friends != null
        ? this.friends.filter((friend) => {
            return (
              friend.usuario
                .toLowerCase()
                .indexOf(this.username.toLowerCase()) != -1
            );
          })
        : null;
    },
    habilitarSubmit() {
      return Boolean(this.todo.id);
    },
  },
});
</script>

<style></style>
