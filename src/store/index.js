import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mainClock: 0,
    scheduleTick: 0,
    numberOfSteps: 16
  },
  getters: {
    currentStep: state => {
      return state.scheduleTick % state.numberOfSteps;
    }
  },
  mutations: {
     incrementMainClock (state, time) {
      state.mainClock = time
     },
     incrementScheduleTick (state) {
       state.scheduleTick++
     }
  },
  actions: {
  },
  modules: {
  }
})
