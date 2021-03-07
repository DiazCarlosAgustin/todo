import axios from "axios";
import store from "./index";

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
    UPDATE_TODO(state, index, payment) {
      //TODO: HACER LA MUTACION PARA ACTUALIZAR UN TODO
      state.todos.split(index, 1, payment);
    },
  },
  actions: {
    /**
     *
     * @param {vuex} context
     * @param {payment} todo
     */
    async add_todo(context, todo) {
      console.log(todo);
      await axios
        .post("http://127.0.0.1:3000/todo/", todo, {
          headers: {
            userToken: store.getters["user/GET_TOKEN"],
          },
        })
        .then(async (res) => {
          const type = await store.dispatch(
            "alert/getTypeAlert",
            res.data.status
          );
          store.dispatch("alert/addAlert", {
            msg: res.data.msg,
            type: type,
          });
          if (res.data.status === "Ok") {
            context.commit("SET_TODO", res.data.todo);
          }
        });
    },

    /**
     *
     * @param {vuex} context
     * @param {id_user} id
     */
    async get_todos(context, id) {
      await axios
        .get("http://127.0.0.1:3000/todo/" + id, {
          headers: {
            userToken: store.getters["user/GET_TOKEN"],
          },
        })
        .then((res) => {
          if (res.data.status === "Ok") {
            context.commit("SET_TODOS", res.data.todo);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    /**
     *
     * @param {vuex} commit
     * @param {elementos a actualizar } payment
     */
    async update_todo({ commit }, payment) {
      const index = payment[0];
      const todo = payment[1];
      await axios
        .put("http://127.0.0.1:3000/todo", todo, {
          headers: {
            userToken: store.getters["user/GET_TOKEN"],
          },
        })
        .then((res) => {
          if (res.status === "Ok" || res.status === "Fail") {
            commit("UPDATE_TODO", index, res.todo);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
