<template>
  <tr>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm text-gray-900">
        {{ todo.id }}
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm text-gray-900" v-if="!edit">
        {{ todo.titulo }}
      </div>
      <div class="text-sm text-gray-900" v-if="edit">
        <input
          class="p-2 border"
          type="text"
          name="titulo"
          v-model="todo.titulo"
          id="titulo"
        />
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm text-gray-900" v-if="!edit">
        {{ todo.descripcion }}
      </div>
      <div class="text-sm text-gray-900" v-if="edit">
        <input
          class="p-2 border"
          type="text"
          name="descripcion"
          v-model="todo.descripcion"
          id="descripcion"
        />
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="w-full shadow bg-gray-100 rounded-md" v-if="!edit">
        <div
          class="bg-green-500 text-xs leading-none py-1 text-center rounded-md text-black "
          :style="{ width: todo.progreso + '%' }"
        >
          <span v-if="todo.progreso < 100">{{ todo.progreso }}%</span>
          <span v-else>Completado</span>
        </div>
      </div>
      <div class="text-sm text-gray-900" v-if="edit">
        <input
          class="p-2 border"
          type="number"
          name="progreso"
          min="0"
          max="100"
          v-model="todo.progreso"
          id="progreso"
        />
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm text-gray-900">
        {{ todo.createdAt | formatDate }}
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm text-gray-900">
        {{ todo.updatedAt | formatDate }}
      </div>
    </td>
    <td class="px-6 py-6 text-right text-sm font-medium flex items-center">
      <span
        class="text-green-600 hover:text-green-900 px-3"
        v-if="!edit"
        @click="edit = !edit"
      >
        <svg
          class="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </span>
      <span
        class="text-green-600 hover:text-green-900 px-3"
        v-if="edit"
        @click="
          edit = !edit;
          updateTodo([index, todo]);
        "
      >
        <svg
          class="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </span>
      <span
        class="text-red-600 hover:text-red-900 px-3"
        @click="deleteTodo([todo.id, index])"
      >
        <svg
          class="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </span>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
Vue.filter("formatDate", (value) => {
  const date = new Date(value);
  return date.toLocaleDateString(["es-AR"], {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});
export default Vue.extend({
  props: ["todo"],
  data() {
    return {
      edit: false,
    };
  },
  methods: {
    ...mapActions({
      updateTodo: "todo/update_todo",
      deleteTodo: "todo/delete_todo",
    }),
  },
});
</script>

<style scoped></style>
