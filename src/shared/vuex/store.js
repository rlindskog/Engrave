import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    text: '',
    serverText: '',
  },
  mutations: {
    letter(state, payload) {
      let letter = payload.letter
      state.text += letter
    },

    // socket listeners...
    SOCKET_letter(state, data) {
      let letter = data.letter
      console.log(letter)
      state.serverText += letter
    }
  }
})

export default store
