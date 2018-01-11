<template>
  <v-app light class="main">
    <router-view></router-view>
  </v-app>
</template>

<script>
  export default {
    data () {
      return { }
    }
  }
</script>

<style>
  .main {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
  }

  .right-input {
    padding-right: 0 !important;
  }

  .right-input input {
    text-align: right;
    font-size: 13px !important;
  }

  .right-input input:disabled {
    color: rgba(0,0,0,0.87);
  }
</style>
