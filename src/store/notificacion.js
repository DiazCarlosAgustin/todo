import store from "./index";
import axios from "axios";

export default {
  namespaced: true,
  state: {
    notificaciones: [],
  },
  getters: {
    GET_NOTIFICACIONES(state) {
      return state.notificaciones;
    },
  },
  mutations: {
    SET_NOTIFICACIONES(state, params) {
      state.notificaciones = params;
    },
  },
  actions: {
    async get_notificaciones({ commit }) {
      const idUser = store.getters["user/GET_USER_ID"];
      await axios
        .get("http://127.0.0.1:3000/notificacion/" + idUser, {
          headers: {
            userToken: store.getters["user/GET_TOKEN"],
          },
        })
        .then((res) => {
          if (res.data.status === "Ok") {
            commit("SET_NOTIFICACIONES", res.data.notificaciones);
          } else {
            console.log(res.data.msg);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
