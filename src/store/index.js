import Vue from "vue";
import Vuex from "vuex";
import User from "./user";
import Todo from "./todo";
import Friend from "./friend";
import Alert from "./alert";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user: User,
    todo: Todo,
    friend: Friend,
    alert: Alert,
  },
});
