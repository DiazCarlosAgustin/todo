<template>
  <div class=" pt-24 min-h-screen">
    <AddTodo />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import AddTodo from "../components/todo/addTodo.vue";
export default Vue.extend({
  data() {
    return {};
  },
  components: {
    AddTodo,
  },
});
</script>
