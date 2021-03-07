export default {
  namespaced: true,
  state: {
    alerts: [],
  },
  getters: {
    GET_ALERTS(state) {
      return state.alerts;
    },
  },
  mutations: {
    SET_ALERT(state, payment) {
      console.log(payment);
      state.alerts.push(payment);
    },
    DELETE_ALERT(state, index) {
      state.alerts.splice(index, 1);
    },
  },
  actions: {
    addAlert(context, payment) {
      if (payment != null) {
        context.commit("SET_ALERT", payment);
      }
    },
    closeAlert(context, index) {
      context.commit("DELETE_ALERT", index);
    },
    async getTypeAlert(context, type) {
      let alertType = "";
      if (type === "Fail") {
        alertType = "danger";
      } else if (type === "Ok") {
        alertType = "success";
      } else if (type === "Await") {
        alertType = "warning";
      } else {
        alertType = "info";
      }
      return alertType;
    },
  },
};
