import Vue from 'vue'
import { app, store } from '../shared/app'


// this file is not hot reloadable.  You don't need to...
// this will rehydrate the app on the client

// see vue-ssr-html-stream
// https://github.com/vuejs/vue-ssr-html-stream/blob/master/index.js
store.replaceState(window.__INITIAL_STATE__)
// mount the app
app.$mount('#app')
