import socket from 'socket.io-client'
import VueSocketio from 'vue-socket.io'
import Vue from 'vue'
import { app, store } from '../shared/app'

Vue.use(VueSocketio, socket('http://127.0.0.1:3000'), store)

// this file is not hot reloadable.  You don't need to...
// this will rehydrate the app on the client

// see vue-ssr-html-stream
// https://github.com/vuejs/vue-ssr-html-stream/blob/master/index.js
store.replaceState(window.__INITIAL_STATE__)
// mount the app
app.$mount('#app')
