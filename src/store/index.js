import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // User state
  state: {
    loggedIn: false,
    username: null,
    user: null,
    role: "",
    timestamp: 0,
  },
  mutations: {
    setLoggedIn(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
    setUsername(state, username) {
      state.username = username;
    },
    setName(state, name) {
      state.name = name;
    },
    setRole(state, isRole) {
      state.role = isRole;
    },
    setTimestamp(state, timestamp) {
      state.timestamp = timestamp;
    },
  },
  actions: {
    setUserState({ commit }, payload) {
      commit("setLoggedIn", payload.loggedIn);
      commit("setUsername", payload.username);
      commit("setName", payload.name);
      commit("setRole", payload.role);
      commit("setTimestamp", payload.timestamp);
    },
    clearUserState({ commit }) {
      commit("setLoggedIn", false);
      commit("setUsername", null);
      commit("setName", null);
      commit("setRole", "");
      commit("setTimestamp", 0);
    },
  },
  modules: {},
});
