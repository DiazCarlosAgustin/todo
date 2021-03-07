<template>
  <div class="flex justify-center ">
    <div class="-my-2 overflow-x-auto w-full sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-auto border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200 ">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Titulo
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Descripción
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Progreso
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fecha de Creación
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ultima actualización
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <span class="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody
              class="bg-white divide-y divide-gray-200"
              v-for="(todo, index) in todos"
              :key="index"
            >
              <bodyTableTodo :index="index" :todo="todo" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import bodyTableTodo from "./bodyTableTodo.vue";
export default Vue.extend({
  data() {
    return {
      edit: false,
    };
  },
  components: {
    bodyTableTodo,
  },
  async mounted() {
    await this.getTodos(this.userId);
  },
  methods: {
    ...mapActions({
      getTodos: "todo/get_todos",
    }),
  },
  computed: {
    ...mapGetters({
      todos: "todo/GET_TODOS",
      userId: "user/GET_USER_ID",
    }),
  },
});
</script>

<style scoped></style>
