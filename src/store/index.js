import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mainClock: 0
  },
  mutations: {
     incrementMainClock (state, time) {
      state.mainClock = time
     }
  },
  actions: {
  },
  modules: {
  }
})
