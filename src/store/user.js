import axios from "axios";
import router from "../router";
import store from "../store";

export default {
  namespaced: true,
  state: {
    auth: false,
    user: null,
    usersToAdd: null,
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
    GET_USER_ID(state) {
      return state.user.id;
    },
    GET_USERS_TO_ADD(state) {
      return state.usersToAdd;
    },
  },
  mutations: {
    SET_USER(state, params) {
      state.user = params;
      state.auth = Boolean(state.user);
    },
    SET_USERS_TO_ADD(state, params) {
      state.usersToAdd = params;
    },
    SET_TOKEN(state, params) {
      localStorage.setItem("userToken", params);
    },
    CLOSE_SESSION(state) {
      localStorage.removeItem("userToken");
      state.user = null;
      state.usersToAdd = null;
      state.auth = false;
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
    async getUsersToAdd(context) {
      await axios
        .get("http://127.0.0.1:3000/user/" + context.getters.GET_USER_ID, {
          headers: {
            userToken: context.getters.GET_TOKEN,
          },
        })
        .then((res) => {
          if (res.data.status === "Ok") {
            context.commit("SET_USERS_TO_ADD", res.data.users);
          }
        })
        .catch((err) => console.error(err));
    },
    cerrarSession(context) {
      context.commit("CLOSE_SESSION");
      router.push({ path: "/acceder" });
    },
    async registrarse(context, user) {
      await axios
        .post("http://127.0.0.1:3000/auth/register", user)
        .then(async (response) => {
          if (response.data.status === "Ok") {
            router.push({ path: "/acceder" });
          }
          const type = await store.dispatch(
            "alert/getTypeAlert",
            response.data.status
          );
          store.dispatch("alert/addAlert", {
            msg: response.data.msg,
            type: type,
          });
        });
    },
  },
};
