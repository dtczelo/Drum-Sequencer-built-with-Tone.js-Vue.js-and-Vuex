import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as Tone from 'tone'

Vue.config.productionTip = false

Object.defineProperty(Vue.prototype, '$tone', { value: Tone });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
