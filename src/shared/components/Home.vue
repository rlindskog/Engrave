<template lang="html">
  <div id="home">
    <h2 class="text">This is the {{name}} page</h2>
    <counter></counter>
  </div>
</template>

<script>
import Counter from './Counter.vue'
export default {
  data() {
    return {
      name: 'Home'
    }
  },
  components: { Counter }
}
</script>

<style lang="css">
  #home {
    text-align: center;
  }
</style>
