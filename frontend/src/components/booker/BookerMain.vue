<template>
  <div>
    <v-tabs v-model="active">
      <v-tabs-bar class="grey" dark>
        <v-tabs-item href="#stock" ripple>Каталог</v-tabs-item>
        <v-tabs-item href="#accounts" ripple>Аккаунты</v-tabs-item>
        <v-tabs-item href="#history" ripple>История активности</v-tabs-item>
        <v-spacer></v-spacer>
        <v-tabs-item href="#exit" @click="exit" ripple>Выход</v-tabs-item>
        <v-tabs-slider color="black"></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-items>
        <v-tabs-content id="stock">
          <v-layout row class="container">
            <v-data-table
              v-bind:headers="headers"
              :items="items"
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.count }}</td>
                <td class="text-xs-right">{{ props.item.size }}</td>
                <td class="text-xs-right">{{ props.item.growth }}</td>
                <td class="text-xs-right pointer" @click="openReservesDialog(props.item)">{{ props.item.reserves }}</td>
              </template>
            </v-data-table>
          </v-layout>
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

    <reserves-modal :reserves-dialog="reservesDialog" :item-id="currentItem.id" @close="reservesDialog = false"></reserves-modal>
  </div>
</template>

<script>
  import ReservesModal from '@/modals/ReservesSewer'
  import BookerAccounts from '@/components/booker/BookerAccounts'

  export default {
    name: 'Booker',
    components: {
      'reserves-modal': ReservesModal,
      'booker-accounts': BookerAccounts
    },
    data() {
      return {
        active: null,
        reservesDialog: false,
        currentItem: 0,
        headers: [
          {
            text: 'Наименование',
            align: 'left',
            value: 'name'
          },
          { text: 'Количество', value: 'count' },
          { text: 'Размер', value: 'size' },
          { text: 'Рост', value: 'growth' },
          { text: 'Резервы', value: 'reserves' }
        ],
        items: [
          {
            id: 0,
            name: 'test1',
            count: 10,
            size: '44:46',
            growth: 1,
            reserves: 5
          }, {
            id: 1,
            name: 'test2',
            count: 5,
            size: '44:46',
            growth: 3,
            reserves: 15
          }, {
            id: 2,
            name: 'test3',
            count: 15,
            size: '48:50',
            growth: 2,
            reserves: 10
          }
        ]
      }
    },
    created() {
      this.$store.dispatch('user_list');
    },
    methods: {
      openReservesDialog(item) {
        this.currentItem = item;
        this.reservesDialog = true;
      },
      exit() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>
