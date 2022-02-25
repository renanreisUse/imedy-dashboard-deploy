import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stateDoctors: null,
    stateFaq: null
  },
  mutations: {
    STORE_DOCTORS(state, payload) {
      state.stateDoctors = payload;
    },
    STORE_FAQ(state, payload) {
      state.stateFaq = payload;
    }
  },
  actions: {
    storeDoctors: ({ commit }, data) => {
      commit("STORE_DOCTORS", data);
    },
    storeFaq: ({ commit }, data) => {
      commit("STORE_FAQ", data);
    }
  }
});
