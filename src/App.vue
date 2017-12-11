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

<style scoped>
  .main {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
  }
</style>
