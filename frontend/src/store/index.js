import { createStore } from "vuex";
//import { sendLoginForm } from "@/functions/fetchUser";

export default createStore({
  state: {
    logState: false, // Indique si l'utilisateur est connecté
  },
  getters: {},
  mutations: {
    CHANGE_LOGSTATE(state, newLogState) {
      state.logState = newLogState;
    },
  },
  actions: {
    changeLogState(context) {
      if (localStorage.length != 0) {
        context.commit("CHANGE_LOGSTATE", true);
      } else {
        context.commit("CHANGE_LOGSTATE", false);
      }
    },
  },
  modules: {},
});
