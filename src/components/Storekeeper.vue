<template>
  <div>
    <v-tabs v-model="active">
      <v-tabs-bar class="grey" dark>
        <v-tabs-item href="#shipment" ripple>Отгрузка</v-tabs-item>
        <v-tabs-item href="#stock" ripple>Склад</v-tabs-item>
        <v-spacer></v-spacer>
        <v-tabs-item href="#exit" @click="exit" ripple>Выход</v-tabs-item>
        <v-tabs-slider color="black"></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-items>
        <v-tabs-content id="shipment">
          <v-layout row class="container">
            <v-data-table
              v-bind:headers="shipmentHeaders"
              :items="shipmentItems"
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.count }}</td>
                <td class="text-xs-right">{{ props.item.size }}</td>
                <td class="text-xs-right">{{ props.item.growth }}</td>
                <td class="text-xs-right">{{ props.item.client }}</td>
                <td class="text-xs-right">{{ props.item.due_date | moment("DD/MM/YYYY, HH:mm") }}</td>
              </template>
            </v-data-table>
          </v-layout>
        </v-tabs-content>

        <v-tabs-content id="stock">
          <v-layout row class="container">
            <v-data-table
              v-bind:headers="stockHeaders"
              :items="stockItems"
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.count }}</td>
                <td class="text-xs-right">{{ props.item.size }}</td>
                <td class="text-xs-right">{{ props.item.growth }}</td>
              </template>
            </v-data-table>
          </v-layout>
        </v-tabs-content>
        <v-tabs-content id="exit">Что-то пошло не так))</v-tabs-content>
      </v-tabs-items>
    </v-tabs>

    <reserves-modal :reserves-dialog="reservesDialog" :item-id="currentItem.id" @close="reservesDialog = false"></reserves-modal>
  </div>
</template>

<script>
  export default {
    name: 'Storekeeper',
    data() {
      return {
        active: null,
        reservesDialog: false,
        currentItem: 0,
        shipmentHeaders: [
          {
            text: 'Наименование',
            align: 'left',
            value: 'name'
          },
          { text: 'Количество', value: 'count' },
          { text: 'Размер', value: 'size' },
          { text: 'Рост', value: 'growth' },
          { text: 'Клиент', value: 'client' },
          { text: 'Дата', value: 'due_date' }
        ],
        stockHeaders: [
          {
            text: 'Наименование',
            align: 'left',
            value: 'name'
          },
          { text: 'Количество', value: 'count' },
          { text: 'Размер', value: 'size' },
          { text: 'Рост', value: 'growth' }
        ],
        shipmentItems: [
          {
            id: 0,
            name: 'test1',
            count: 10,
            size: '44:46',
            growth: 1,
            client: 'Клиент1',
            due_date: new Date()
          }, {
            id: 1,
            name: 'test2',
            count: 5,
            size: '44:46',
            growth: 3,
            client: 'Клиент2',
            due_date: new Date()
          }, {
            id: 2,
            name: 'test3',
            count: 15,
            size: '48:50',
            growth: 2,
            client: 'Клиент1',
            due_date: new Date()
          }
        ],
        stockItems: [
          {
            id: 0,
            name: 'test1',
            count: 10,
            size: '44:46',
            growth: 1
          }, {
            id: 1,
            name: 'test2',
            count: 5,
            size: '44:46',
            growth: 3
          }, {
            id: 2,
            name: 'test3',
            count: 15,
            size: '48:50',
            growth: 2
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
</style>
