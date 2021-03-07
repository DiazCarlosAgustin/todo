<template>
  <div class=" pt-24 min-h-screen">
    <div class="my-5 flex justify-center items-center">
      <buttonAddTodo class="mx-3" :showForm="showFormTodo" />
      <buttonAddFriend class="mx-3" :showForm="showFormFriend" />
    </div>
    <div class="flex justify-center items-center my-4 " v-if="showFormTodo">
      <formAddTodo />
    </div>
    <div class="flex justify-center items-center my-4 " v-if="showFormFriend">
      <formAddFriend />
    </div>
    <div class=" my-3 flex justify-center">
      <tableTodo />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import bus from "../eventBus";
import buttonAddFriend from "../components/options/buttonAddFriend.vue";
import buttonAddTodo from "../components/options/buttonAddTodo.vue";
import formAddTodo from "../components/todo/formTodo.vue";
import formAddFriend from "../components/friends/formAddFriend.vue";
import tableTodo from "../components/todo/tableTodo.vue";
export default Vue.extend({
  data() {
    return {
      showFormFriend: false,
      showFormTodo: false,
    };
  },
  components: {
    buttonAddFriend,
    buttonAddTodo,
    formAddTodo,
    formAddFriend,
    tableTodo,
  },
  created() {
    bus.$on("showFormFriend", (value) => {
      this.showFormFriend = value;
    });
    bus.$on("showFormTodo", (value) => {
      this.showFormTodo = value;
    });
  },
});
</script>
