<template>
  <div>
    <v-tabs v-model="active">
      <v-tabs-bar class="indigo lighten-1 elevation-3" dark>
        <v-tabs-item href="#stock" ripple>Каталог</v-tabs-item>
        <v-spacer></v-spacer>
        <v-tabs-item href="#exit" @click="exit" ripple>Выход</v-tabs-item>
        <v-tabs-slider color="amber"></v-tabs-slider>
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
              v-bind:headers="headers"
              :items="userData.items"
              :search="search"
              :loading="$progress.queue.indexOf('lookup_items') !== -1"
              class="elevation-2"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.count }}</td>
                <td class="text-xs-right">{{ props.item.size }}</td>
                <td class="text-xs-right">{{ props.item.growth }}</td>
                <td class="text-xs-right" style="cursor: pointer" @click="openReservesDialog(props.item)">{{ props.item.reserves }}</td>
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
  import ReservesModal from '@/modals/ReservesSewer'

  export default {
    name: 'Deputy',
    components: { 'reserves-modal': ReservesModal},
    data() {
      return {
        active: null,
        reservesDialog: false,
        search: '',
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
        userData: this.$store.state.userData
      }
    },
    created() {
      this.$store.dispatch('lookup_items');
    },
    methods: {
      openReservesDialog(item) {
        this.$store.dispatch('lookup_reserves', {item_id: item._id});
        this.$store.dispatch('lookup_workshop_reserves', {item_id: item._id});

        this.currentItem = item;
        this.reservesDialog = true;
      },
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
