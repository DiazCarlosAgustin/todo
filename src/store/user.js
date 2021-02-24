import axios from "axios";
import router from "../router";
export default {
  namespaced: true,
  state: {
    auth: false,
    user: null,
  },
  getters: {
    GET_USER(state) {
      return state.user;
    },
    GET_AUTH(state) {
      return state.auth;
    },
    GET_TOKEN() {
      return localStorage.getItem("userToken");
    },
  },
  mutations: {
    SET_USER(state, params) {
      console.log(params);
      state.user = params;
      state.auth = Boolean(state.user);
    },
    SET_TOKEN(state, params) {
      localStorage.setItem("userToken", params);
    },
  },
  actions: {
    async userLogin(context, params) {
      await axios
        .post("http://127.0.0.1:3000/auth/login", params)
        .then((res) => {
          if (res.data.status === "Ok") {
            context.commit("SET_USER", res.data.user);
            context.commit("SET_TOKEN", res.data.token);
            router.push({ path: "/" });
          }
        });
    },
    async getUserLog(context) {
      await axios
        .get("http://127.0.0.1:3000/user/loged", {
          headers: {
            userToken: context.getters.GET_TOKEN,
          },
        })
        .then((res) => {
          if (res.data.status === "Ok" && res.data.user != null) {
            context.commit("SET_USER", res.data.user);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
