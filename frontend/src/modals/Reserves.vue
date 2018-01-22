<template>
  <div>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="headline">
          Резервы: {{item.reserves}}
          <v-spacer></v-spacer>
          <v-progress-circular v-if="progress.active" indeterminate color="blue" ></v-progress-circular>
        </v-card-title>
        <v-card-text>
          <v-layout row>
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Поиск"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
          </v-layout>
          <v-data-table
            :headers="headers"
            :items.sync="userData.reserves"
            :pagination.sync="pagination"
            :search="search"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td :class="{editable: props.item.creator}">{{ props.item.author }}</td>

              <td class="text-xs-right">{{ props.item.created_at | moment("DD/MM/YYYY, HH:mm") }}</td>

              <td class="text-xs-right">
                <v-text-field
                  slot="input"
                  v-if="props.item.creator"
                  class="right-input"
                  v-model="props.item.count"
                  @blur="updateRow(props.item)"
                ></v-text-field>
                <span v-if="!props.item.creator">{{ props.item.count }}</span>
              </td>

              <td class="text-xs-right">
                <v-text-field
                  slot="input"
                  v-if="props.item.creator"
                  class="right-input"
                  v-model="props.item.client"
                  @blur="updateRow(props.item)"
                ></v-text-field>

                <span v-if="!props.item.creator">*******</span>
              </td>

              <td class="text-xs-right">
                <div
                  class="pointer"
                  style="color: darkgreen"
                  v-if="props.item.payment"
                  @click="changePaymentStatus(props.item)"
                >Да</div>
                <div
                  class="pointer"
                  v-if="!props.item.payment"
                  @click="changePaymentStatus(props.item)"
                >Нет</div>
              </td>

              <td class="text-xs-right">
                <v-datetime-picker
                  :datetime="props.item.due_date"
                  @update="(val) => {props.item.due_date = val; updateRow(props.item)}"
                  v-if="props.item.creator"
                ></v-datetime-picker>

                <span v-if="!props.item.creator">{{ props.item.due_date | moment("DD/MM/YYYY, HH:mm") }}</span>
              </td>

              <td class="text-xs-right">
                <v-text-field
                  slot="input"
                  class="right-input"
                  v-model="props.item.payment_number"
                  v-if="props.item.creator"
                  @blur="updateRow(props.item)"
                ></v-text-field>

                <span v-if="!props.item.creator">{{ props.item.payment_number }}</span>
              </td>

              <td class="text-xs-right" :class="{editable: props.item.creator}">
                <v-icon class="pointer" @click="deleteRow(props.item)" v-if="props.item.creator">delete_forever</v-icon>
              </td>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat="flat" @click.native="dialog = false">Закрыть</v-btn>
          <v-btn color="primary" flat="flat" @click.native="addRow()">Добавить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'ReservesModal',
    props: ['item', 'reservesDialog'],
    data() {
      return {
        active: null,
        progress: this.$progress,
        pagination: {sortBy: ''},
        search: '',
        headers: [
          {
            text: 'Создатель',
            align: 'left',
            value: 'author'
          },
          { text: 'Дата создания', value: 'created_at' },
          { text: 'Количество', value: 'count' },
          { text: 'Клиент', value: 'client' },
          { text: 'Оплата', value: 'payment' },
          { text: 'Дата выгрузки', value: 'due_date' },
          { text: 'Номер счёта', value: 'payment_number' },
          { text: '', sortable: false}
        ],
        userData: this.$store.state.userData
      }
    },
    computed: {
      dialog: {
        get: function () {
          return this.reservesDialog
        },
        set: function () {
          this.$emit('close')
        }
      }
    },
    methods: {
      addRow: function() {
        this.$store.dispatch('add_reserves', {item_id: this.item._id});
      },
      updateRow(el) {
        this.$store.dispatch('update_reserves', el);
      },
      deleteRow: function(el) {
        this.$store.dispatch('delete_reserves', {_id: el._id});
      },
      changePaymentStatus(el) {
        if (!el.creator)
          return;

        el.payment = !el.payment;
        this.updateRow(el);
      }
    }
  }
</script>

<style scoped>
  .headline {
    padding-bottom: 0;
  }

  .card__text {
    padding-top: 0
  }

  .pointer {
    cursor: pointer;
  }
</style>
