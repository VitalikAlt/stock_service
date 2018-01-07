<template>
  <div>
    <v-dialog v-model="dialog" max-width="80%" lazy>
      <v-card>
        <v-card-title class="headline">
          Резервы: {{item.reserves}}
          <v-spacer></v-spacer>
          <v-progress-circular v-if="progress.active" indeterminate color="blue"></v-progress-circular>
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
            :items.sync="items"
            :search="search"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td :class="{editable: props.item.creator}">{{ props.item.author }}</td>

              <td class="text-xs-right" :class="{editable: props.item.creator}">{{ props.item.created_at | moment("DD/MM/YYYY, HH:mm") }}</td>

              <td class="text-xs-right" :class="{editable: props.item.creator}">
                <v-text-field
                  slot="input"
                  v-if="props.item.creator"
                  placeholder="Клиент"
                  class="right-input"
                  v-model="props.item.client"
                ></v-text-field>
                <span v-if="!props.item.creator">{{ props.item.client }}</span>
              </td>

              <td class="text-xs-right" :class="{editable: props.item.creator}">
                <v-text-field
                  slot="input"
                  v-if="props.item.creator"
                  placeholder="Количество"
                  class="right-input"
                  v-model="props.item.count"
                ></v-text-field>
                <span v-if="!props.item.creator">{{ props.item.count }}</span>
              </td>

              <td class="text-xs-right" :class="{editable: props.item.creator}">
                <div
                  class="pointer"
                  style="color: darkgreen"
                  v-if="props.item.payment"
                  @click="props.item.creator? props.item.payment = !props.item.payment : null"
                >Да</div>
                <div
                  class="pointer"
                  v-if="!props.item.payment"
                  @click="props.item.creator? props.item.payment = !props.item.payment : null"
                >Нет</div>
              </td>

              <td class="text-xs-right" :class="{editable: props.item.creator}">
                <v-datetime-picker
                  :datetime="props.item.due_date"
                  @select="val => props.item.due_date = val"
                  v-if="props.item.creator"
                ></v-datetime-picker>

                <span v-if="!props.item.creator">{{ props.item.due_date | moment("DD/MM/YYYY, HH:mm") }}</span>
              </td>

              <td class="text-xs-right" :class="{editable: props.item.creator}">
                <v-text-field
                  slot="input"
                  placeholder="Номер счёта"
                  class="right-input"
                  v-model="props.item.payment_number"
                  v-if="props.item.creator"
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
        search: '',
        headers: [
          {
            text: 'Создатель',
            align: 'left',
            value: 'author'
          },
          { text: 'Дата создания', value: 'created_at' },
          { text: 'Клиент', value: 'client' },
          { text: 'Количество', value: 'count' },
          { text: 'Оплата', value: 'payment' },
          { text: 'Дата выгрузки', value: 'due_date' },
          { text: 'Номер счёта', value: 'payment_number' },
          { text: '', sortable: false}
        ],
        items: [
          {
            author: 'Виталий',
            client: 'Алексей',
            count: 1,
            created_at: new Date(),
            payment: true,
            due_date: new Date(),
            payment_number: '123131asd'
          }, {
            author: 'Виталий',
            client: 'Алексей',
            count: 2,
            created_at: new Date(),
            payment: true,
            due_date: new Date(),
            payment_number: '123131asd',
            creator: true
          }, {
            author: 'Виталий',
            client: 'Алексей',
            count: 2,
            created_at: new Date(),
            payment: true,
            due_date: new Date(),
            payment_number: '123131asd'
          }
        ]
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
      deleteRow: function(el) {
        this.items.splice(this.items.indexOf(el), 1)
      },
      addRow: function() {
        this.items.unshift({creator: true, author: 'Виталий', created_at: new Date(), due_date: new Date()});
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

  .editable {
    background-color: #d8d8d896;
  }
</style>
