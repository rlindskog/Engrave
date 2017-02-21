import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import socket from 'socket.io-client'
import store from './vuex/store'
import VueSocketio from 'vue-socket.io'

Vue.use(VueSocketio, socket('http://127.0.0.1:3000'), store)

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
