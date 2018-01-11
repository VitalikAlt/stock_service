<template>
  <div>
    <v-tabs v-model="active">
      <v-tabs-bar class="grey" dark>
        <v-tabs-item href="#stock" ripple>Каталог</v-tabs-item>
        <v-spacer></v-spacer>
        <v-tabs-item href="#exit" @click="exit" ripple>Выход</v-tabs-item>
        <v-tabs-slider color="black"></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-items>
        <v-tabs-content id="stock">
          <v-layout row class="container search">
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Поиск"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
          </v-layout>

          <v-layout row class="container">
              <v-data-table
                :headers="headers"
                :items="items"
                :search="search"
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
        <v-tabs-content id="exit">Что-то пошло не так))</v-tabs-content>
      </v-tabs-items>
    </v-tabs>

    <reserves-modal :reserves-dialog="reservesDialog" :item="currentItem" @close="reservesDialog = false"></reserves-modal>
  </div>
</template>

<script>
  import ReservesModal from '@/modals/Reserves'

  export default {
    name: 'Manager',
    components: { 'reserves-modal': ReservesModal},
    data() {
      return {
        active: null,
        reservesDialog: false,
        currentItem: 0,
        menu: false,
        date: null,
        search: '',
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

  .search {
    padding-bottom: 0;
  }
</style>
