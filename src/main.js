import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as Tone from 'tone'
import { uuid } from 'uuidv4';

Vue.config.productionTip = false

Object.defineProperty(Vue.prototype, '$tone', { value: Tone });
Object.defineProperty(Vue.prototype, '$uuid', { value: uuid });


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
