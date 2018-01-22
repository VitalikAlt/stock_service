<template>
  <div>
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
        :items.sync="userData.items"
        :pagination.sync="pagination"
        :search="search"
        :loading="$progress.queue.indexOf('lookup_items') !== -1"
        class="elevation-2"
      >
        <template slot="items" slot-scope="props">
          <td class="column-compressed">{{ props.index + 1 }}</td>
          <td class="text-xs-right">
            <v-text-field
              slot="input"
              class="right-input"
              v-model="props.item.name"
              @blur="updateRow(props.item)"
            ></v-text-field>
          </td>
          <td class="text-xs-right">
            <v-text-field
              slot="input"
              class="right-input"
              v-model="props.item.count"
              @blur="updateRow(props.item)"
            ></v-text-field>
          </td>
          <td class="text-xs-right">
            <v-text-field
              slot="input"
              class="right-input"
              v-model="props.item.growth"
              @blur="updateRow(props.item)"
            ></v-text-field>
          </td>
          <td class="text-xs-right">
            <v-text-field
              slot="input"
              class="right-input"
              v-model="props.item.size"
              @blur="updateRow(props.item)"
            ></v-text-field>
          </td>
          <td class="text-xs-right pointer" @click="openReservesDialog(props.item)">{{ props.item.reserves }}</td>
          <td class="column-compressed">
            <v-icon class="pointer delete-action" @click="deleteRow(props.item)">delete_forever</v-icon>
          </td>
        </template>
      </v-data-table>
    </v-layout>
    <v-layout justify-center>
      <v-btn color="primary" outline large @click.native="addRow()">Добавить</v-btn>
    </v-layout>

    <reserves-modal :reserves-dialog="reservesDialog" :item="currentItem" @close="reservesDialog = false"></reserves-modal>
  </div>
</template>

<script>
  import ReservesModal from '@/modals/ReservesSewer'

  export default {
    name: 'BookerItems',
    components: {'reserves-modal': ReservesModal},
    data() {
      return {
        currentItem: 0,
        reservesDialog: false,
        pagination: {sortBy: ''},
        search: '',
        headers: [
          { text: 'Номер', align: 'left', sortable: false, value: 'name' },
          { text: 'Наименование', value: 'name' },
          { text: 'Количество', value: 'count' },
          { text: 'Рост', value: 'growth' },
          { text: 'Размер', value: 'size' },
          { text: 'Резервы', value: 'reserves' },
          { text: '', sortable: false, value: 'name'}
        ],
        userData: this.$store.state.userData
      }
    },
    methods: {
      addRow() {
        this.$store.dispatch('add_items');
      },
      updateRow(el) {
        this.$store.dispatch('update_items', el);
      },
      deleteRow(el) {
        this.$store.dispatch('delete_items', {_id: el._id});
      },
      openReservesDialog(item) {
        this.$store.dispatch('lookup_reserves', {item_id: item._id});
        this.$store.dispatch('lookup_workshop_reserves', {item_id: item._id});

        this.currentItem = item;
        this.reservesDialog = true;
      },
    }
  }
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>
