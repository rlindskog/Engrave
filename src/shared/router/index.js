import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  About,
  Home
} from '../views'

// import {
//   AsyncHome,
//   AsyncAbout
// } from '../views'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  }
]



// function view(name) {
//   let path = '../views/' + name + '.vue'
//     return function(resolve) {
//       require(['../views'], resolve)
//     }
// }

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
