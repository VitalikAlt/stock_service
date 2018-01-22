<template>
  <div>
    <v-tabs v-model="active">
      <v-tabs-bar class="indigo lighten-1 elevation-3" dark>
        <v-tabs-item href="#items" ripple>Каталог</v-tabs-item>
        <v-tabs-item href="#accounts" ripple>Аккаунты</v-tabs-item>
        <v-tabs-item href="#history" ripple>История активности</v-tabs-item>
        <v-spacer></v-spacer>
        <v-tabs-item href="#exit" @click="exit" ripple>Выход</v-tabs-item>
        <v-tabs-slider color="amber"></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-items>

        <v-tabs-content id="items">
          <booker-items></booker-items>
        </v-tabs-content>

        <v-tabs-content id="accounts">
          <booker-accounts></booker-accounts>
        </v-tabs-content>

        <v-tabs-content id="history">
          <v-layout row class="container">
            В разработке
          </v-layout>
        </v-tabs-content>

        <v-tabs-content id="exit">Что-то пошло не так))</v-tabs-content>

      </v-tabs-items>
    </v-tabs>
  </div>
</template>

<script>
  import BookerItems from '@/components/booker/BookerItems'
  import BookerAccounts from '@/components/booker/BookerAccounts'

  export default {
    name: 'Booker',
    components: {
      'booker-items': BookerItems,
      'booker-accounts': BookerAccounts
    },
    data() {
      return {
        active: null
      }
    },
    created() {
      this.$store.dispatch('lookup_items');
      this.$store.dispatch('lookup_users');
    },
    methods: {
      exit() {
        this.$store.dispatch('sign_out')
      }
    }
  }
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>
