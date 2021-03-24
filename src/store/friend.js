import axios from "axios";
import store from "../store";
export default {
  namespaced: true,
  state: {
    friends: [],
    username: "",
  },
  getters: {
    GET_FRIENDS(state) {
      return state.friends;
    },
  },
  mutations: {
    SET_FRIENDS(state, payment) {
      state.friends = [];
      payment.forEach((friend) => {
        console.log(friend.friend_id);
        state.friends.push(friend.friend_id);
      });
    },
  },
  actions: {
    async getFriends({ commit }) {
      const id = store.getters["user/GET_USER_ID"];
      await axios
        .get("http://127.0.0.1:3000/friend/" + id, {
          headers: {
            userToken: store.getters["user/GET_TOKEN"],
          },
        })
        .then((res) => {
          if (res.data.status === "Ok") {
            commit("SET_FRIENDS", res.data.friends);
          }
        });
    },
    async addFriend(context, friend_id) {
      const id = store.getters["user/GET_USER_ID"];
      console.log(id, friend_id);
      await axios
        .post(
          "http://127.0.0.1:3000/friend/",
          { user_id: id, friend_id },
          {
            headers: {
              userToken: store.getters["user/GET_TOKEN"],
            },
          }
        )
        .then(async (res) => {
          const type = await store.dispatch(
            "alert/getTypeAlert",
            res.data.status
          );
          store.dispatch("alert/addAlert", {
            msg: res.data.msg,
            type: type,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async updateSolicitud(context, params) {
      const id = store.getters["user/GET_USER_ID"];
      console.log(params);
      await axios
        .put(
          "http://127.0.0.1:3000/friend/",
          {
            friend_id: params.friend_id,
            user_id: id,
            aceptado: params.aceptado,
          },
          {
            headers: {
              userToken: store.getters["user/GET_TOKEN"],
            },
          }
        )
        .then(async (res) => {
          const type = await store.dispatch(
            "alert/getTypeAlert",
            res.data.status
          );
          store.dispatch("alert/addAlert", {
            msg: res.data.msg,
            type: type,
          });
        });
    },
  },
};
