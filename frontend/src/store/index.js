import { createStore } from "vuex";
//import { sendLoginForm } from "@/functions/fetchUser";

export default createStore({
  state: {
    userId: 1,
    nickname: "",
    password: "",
  },
  getters: {},
  mutations: {
    CHANGE_NICKNAME(state, newNickname) {
      state.userId = newNickname;
    },
    CHANGE_PASSWORD(state, newPassword) {
      state.userId = newPassword;
    },
    CHANGE_ID(state, newId) {
      state.userId = newId;
    },
  },
  actions: {
    updateNicknameWhenSubmittingForm({ context }, amount) {
      context.commit("CHANGE_NICKNAME", amount);
    },
    updatePasswordWhenSubmittingForm({ context }, amount) {
      context.commit("CHANGE_PASSWORD", amount);
    },
    updateIdWhenLogged({ context }, amount) {
      context.commit("CHANGE_ID", amount);
    },
  },
  modules: {},
});
