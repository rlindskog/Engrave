<template lang="html">
  <div>
    <img class="logo" src="~./engrave-logo.png">
    <div id="engrave">
      <span id="engrave-text">{{text}}</span>
      <input id="engrave-input" v-on:keydown="keyPressed"></input>
      <button id="engrave-submit" class="inactive" v-on:click="engraved">Engrave</input>
    </div>
  </div>
</template>

<script>
// import io from 'socket.io-client'
// if (process.env.CLIENT) {
//   let socket = io('http://127.0.0.1:3000')
// }
// console.log('NIIIIIIIICECEEEEE')
console.log('asd')
export default {
  ready() {

  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    keyPressed(e) {
      setTimeout(() => {
        let letter = e.target.value
        // send letter to server...
        if (letter.length == 1) {
          console.log(letter)
          // if (process.env.CLIENT) {
          //   socket.emit('letter', { letter });
          // }
          this.text += letter
        } else {
            e.target.value = ''
        }
        // optimistic success
        e.target.value = ''
      }, 0)
    },
    engraved(e) {
      e.preventDefault()
      e.target.className = 'active'
    }
  }
}
</script>

<style lang="css">
  #engrave {

  }
  #engrave-text {
    vertical-align: middle;
    font-size: 30px;
  }
  #engrave-input {
    vertical-align: middle;
    font-size: 30px;
    height: 50px;
    width: 50px;
    align-items: center;
    outline: none;
    border: 1px solid black;
    border-radius: 10px;
  }
  #engrave-submit {
    vertical-align: middle;
    margin-left: 30px;
    font-size: 15px;
    height: 50px;
    width: 70px;
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
    color: black;
    cursor: pointer;
    outline: none;
    transition: .25s;
  }

  #engrave-submit.inactive:hover {
    margin-top: -7px;
    box-shadow: 0px 7px 30px 2px rgba(0,0,0,.5);
  }

  #engrave-submit.active: {
    margin-top: 7px;
    box-shadow: 0px 7px 30px 2px rgba(0,0,0,0);
  }

  .logo {
    width: 300px;
  }

</style>
