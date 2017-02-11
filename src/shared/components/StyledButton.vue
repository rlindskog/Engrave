<template lang="html">
  <button id="button">Sweet</button>
</template>

<script>
export default {

}
</script>

<style lang="css">
  #button {
    text-align: center;
    position: fixed;
    font-size: 1em;
    color: #caf;
    width: 5em;
    height: 3em;
    border: 1px solid #caf;
    background-color: #c0ffee;
    border-radius: 10px;
    cursor: pointer;
    outline: none;
    transition: .25s;
    box-shadow: 0px 4px 10px 0px rgba(0,0,0,.6)
  }

  #button:hover {
    margin-top: -4px;
    box-shadow: 0px 8px 30px 0px rgba(0,0,0,.6);
  }
</style>
