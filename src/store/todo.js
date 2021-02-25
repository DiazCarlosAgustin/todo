import axios from "axios";

export default {
  namespaced: true,
  state: {
    todos: [],
  },
  getters: {
    GET_TODOS(state) {
      return state.todos;
    },
  },
  mutations: {
    SET_TODOS(state, params) {
      state.todos = params;
    },
    // DELETE_TODO(state, params) {
    // TODO: hacer la mutacion para eliminar 1 todo
    // },
    // UPDATE_TODO(state, payment) {
    //TODO: HACER LA MUTACION PARA ACTUALIZAR UN TODO
    // },
  },
  actions: {
    async get_todos(context, id) {
      await axios
        .get("http://127.0.0.1:3000/todo/" + id)
        .then((res) => {
          if (res.data.status === "Ok") {
            context.commit("SET_TODOS", res.data.todo);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
