<template>
  <div id="counter">
    <button class="math" v-on:click="increment">+</button>
    <button class="math" v-on:click="decrement">-</button>
    <h2>{{count}}</h2>
  </div>
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.state.count
    }
  },
  methods: {
    increment() {
      this.$store.commit('increment')
    },
    decrement() {
      this.$store.commit('decrement')
    }
  }
}
</script>


<style lang="css">
  #counter {

  }
  .math {
    margin: 20px;
    font-size: 50px;
    background-color: palevioletred;
    border: 1px solid red;
    width: 70px;
    height: 70px;
    border-radius: 10px;
    box-shadow: 0px 3px 10px 2px rgba(0,0,0,.4);
    cursor: pointer;
    transition: .25s;
  }
  .math:hover {
    box-shadow: 0px 3px 10px 4px rgba(0,0,0,.4);
  }
  .math:focus {
    outline: none;
  }
</style>
