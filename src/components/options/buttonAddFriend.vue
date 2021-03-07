<template>
  <button
    class="bg-green-500 p-2 flex text-gray-50 justify-center rounded-md items-center shadow-md"
    @click="showFormAction"
  >
    <template v-if="!showForm">
      <svg
        class="h-6 w-6 "
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      <h1 class="text-lg">Agregar Amigos</h1>
    </template>
    <template v-else>
      <svg
        class="h-6 w-6 "
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M18 12H6"
        />
      </svg>
      <h1 class="text-lg">Ocultar</h1>
    </template>
  </button>
</template>
<script lang="ts">
import Vue from "vue";
import bus from "../../eventBus";
export default Vue.extend({
  props: {
    showForm: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    showFormAction() {
      bus.$emit("showFormFriend", !this.showForm);
    },
  },
});
</script>
