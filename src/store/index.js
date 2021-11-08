import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {stateDoctors: null},
  mutations: {'STORE_DOCTORS' (state, payload) { state.stateDoctors = payload }
  },
  actions: {storeDoctors: ({commit}, data) => { commit('STORE_DOCTORS', data) }
  }
})
