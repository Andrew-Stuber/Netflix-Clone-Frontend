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
    videos: null,
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
    setVideos(state, videos) {
      state.videos = videos;
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
    setVideos({ commit }, payload) {
      commit("setVideos", payload);
    },
    async retrieveVideos({ commit }) {
      let response = await Vue.axios.get("/api/videos");
      commit("setVideos", response.data);
    },
    async retrieveUserState({ commit }) {
      let response = await Vue.axios.get("/api/whoami");
      commit("setLoggedIn", response.data.loggedIn);
      commit("setUsername", response.data.username);
      commit("setName", response.data.name);
      commit("setRole", response.data.role);
      commit("setTimestamp", response.data.timestamp);
    },
  },
  modules: {},
});
