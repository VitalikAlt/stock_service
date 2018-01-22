<template>
  <div>
    <v-tabs v-model="active">
      <v-tabs-bar class="indigo lighten-1 elevation-3" dark>
        <v-tabs-item href="#shipment" ripple>Отгрузка</v-tabs-item>
        <v-tabs-item href="#stock" ripple>Склад</v-tabs-item>
        <v-spacer></v-spacer>
        <v-tabs-item href="#exit" @click="exit" ripple>Выход</v-tabs-item>
        <v-tabs-slider color="amber"></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-items>
        <v-tabs-content id="shipment">
          <v-layout row class="container search">
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Поиск"
              single-line
              hide-details
              v-model="shipmentSearch"
            ></v-text-field>
          </v-layout>
          <v-layout row class="container">
            <v-data-table
              v-bind:headers="shipmentHeaders"
              :items="userData.paid_reserves"
              :search="shipmentSearch"
              :loading="$progress.queue.indexOf('lookup_items') !== -1"
              class="elevation-2"
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
          <v-layout row class="container search">
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Поиск"
              single-line
              hide-details
              v-model="stockSearch"
            ></v-text-field>
          </v-layout>
          <v-layout row class="container">
            <v-data-table
              v-bind:headers="stockHeaders"
              :items="userData.items"
              :search="stockSearch"
              :loading="$progress.queue.indexOf('lookup_items') !== -1"
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
  </div>
</template>

<script>
  export default {
    name: 'Storekeeper',
    data() {
      return {
        active: null,
        shipmentSearch: '',
        stockSearch: '',
        userData: this.$store.state.userData,
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
        ]
      }
    },
    created() {
      this.$store.dispatch('lookup_items');
      this.$store.dispatch('lookup_paid_reserves')
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
