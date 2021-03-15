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
    DELETE_TODO(state, index) {
      state.todos.splice(index, 1);
    },
    UPDATE_TODO(state, index, payment) {
      state.todos.splice(index, 1, payment);
    },
  },
  actions: {
    /**
     *
     * @param  context
     * @param  todo
     */
    async add_todo(context, todo) {
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
            context.commit("SET_TODOS", res.data.todo);
          }
        });
    },

    /**
     *
     * @param  context
     * @param  id
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
     * @param  commit
     * @param  payment
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
        .then(async (res) => {
          const type = await store.dispatch(
            "alert/getTypeAlert",
            res.data.status
          );
          store.dispatch("alert/addAlert", {
            msg: res.data.msg,
            type: type,
          });
          if (res.data.status === "Ok" || res.data.status === "Fail") {
            commit("UPDATE_TODO", index, res.data.todo);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async delete_todo(context, params) {
      const id = params[0];
      const index = params[1];
      await axios
        .delete("http://127.0.0.1:3000/todo/" + id, {
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
            context.commit("DELETE_TODO", index);
          }
        });
    },
  },
};
