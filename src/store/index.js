import Vue from "vue";
import Vuex from "vuex";
import User from "./user";
import Todo from "./todo";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user: User,
    todo: Todo,
  },
});
