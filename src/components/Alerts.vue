<template>
  <div
    class=" mx-4 p-3 mb-2 flex items-center justify-between"
    :class="getClassBg(alert.type)"
  >
    <span :class="getClassColorText(alert.type)">{{ alert.msg }}</span>
    <button class=" ml-3" @click="closeAlert(index)">
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
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
export default Vue.extend({
  name: "Alert",
  props: ["alert", "index"],
  data() {
    return {};
  },
  mounted() {
    setTimeout(() => {
      this.closeAlert(this.index);
      // console.log("hola");
    }, 3000);
  },
  methods: {
    ...mapActions({
      closeAlert: "alert/closeAlert",
    }),
    getClassBg(type) {
      if (type === "danger") {
        return "bg-red-400";
      } else if (type === "success") {
        return "bg-green-400";
      } else if (type === "warning") {
        return "bg-yellow-400";
      } else {
        return "bg-blue-400";
      }
    },
    getClassColorText(type) {
      if (type === "danger") {
        return "text-red-800";
      } else if (type === "success") {
        return "text-green-800";
      } else if (type === "warning") {
        return "text-yellow-800";
      } else {
        return "text-blue-800";
      }
    },
  },
});
</script>

<style scoped></style>
