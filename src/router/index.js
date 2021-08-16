import Vue from 'vue'
import VueRouter from 'vue-router'
import FrontPanel from '../views/FrontPanel.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Front panel',
    component: FrontPanel
  },
  {
    path: '/config',
    name: 'Config',
    component: () => import('../views/Config.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
