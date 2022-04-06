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
    videos: null,
    numVideos: 0,
    list: null,
    numList: 0,
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
    setVideos(state, videos) {
      state.videos = videos;
    },
    setNumVideos(state, numVideos) {
      state.numVideos = numVideos;
    },
    setList(state, list) {
      state.list = list;
    },
    setNumList(state, numList) {
      state.numList = numList;
    },
  },
  actions: {
    setUserState({ commit }, payload) {
      commit("setLoggedIn", payload.loggedIn);
      commit("setUsername", payload.username);
      commit("setName", payload.name);
      commit("setRole", payload.role);
    },
    clearUserState({ commit }) {
      commit("setLoggedIn", false);
      commit("setUsername", null);
      commit("setName", null);
      commit("setRole", "");
    },
    setVideos({ commit }, payload) {
      commit("setVideos", payload);
    },
    async retrieveVideos({ commit }) {
      let response = await Vue.axios.get("/api/videos");
      commit("setVideos", response.data);
      commit("setNumVideos", response.data.length);
    },
    async retrieveUserState({ commit }) {
      let response = await Vue.axios.get("/api/whoami");
      commit("setLoggedIn", response.data.loggedIn);
      commit("setUsername", response.data.username);
      commit("setName", response.data.name);
      commit("setRole", response.data.role);
    },
  },
  modules: {},
});
