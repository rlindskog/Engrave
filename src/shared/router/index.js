import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  Home,
  Auth
} from '../views'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/auth',
    component: Auth
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
