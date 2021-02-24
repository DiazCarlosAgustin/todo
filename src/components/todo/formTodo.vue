<template>
  <transition>
    <div class="flex justify-center items-center my-4 " v-if="showForm">
      <form
        class="p-6 bg-white shadow-lg max-w-sm text-green-400 font-semibold text-left rounded-md"
      >
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
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    showForm: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      todo: {
        titulo: "",
        descripcion: "",
        userId: 0,
        fromUser: 0,
        progreso: 0,
      },
    };
  },
});
</script>

<style></style>
