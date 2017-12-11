<template>
  <div>
    <v-dialog v-model="dialog" max-width="80%" lazy>
      <v-card>
        <v-card-title class="headline">
          Резервы:
          <v-spacer></v-spacer>
          <v-progress-circular v-if="progress.active" indeterminate color="blue"></v-progress-circular>
        </v-card-title>
        <v-card-text>
          <v-data-table
            v-bind:headers="headers"
            :items.sync="items"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.author }}</td>
              <td class="text-xs-right">{{ props.item.client }}</td>
              <td class="text-xs-right">{{ props.item.count }}</td>
              <td class="text-xs-right">{{ props.item.created_at }}</td>
              <td class="text-xs-right">{{ props.item.payment }}</td>
              <td class="text-xs-right">{{ props.item.due_date }}</td>
              <td class="text-xs-right">{{ props.item.payment_number }}</td>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat="flat" @click.native="dialog = false">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'ReservesModal',
    props: ['itemId', 'reservesDialog'],
    data() {
      return {
        active: null,
        progress: this.$progress,
        headers: [
          {
            text: 'Создатель',
            align: 'left',
            value: 'author'
          },
          { text: 'Клиент', value: 'client' },
          { text: 'Количество', value: 'count' },
          { text: 'Дата создания', value: 'created_at' },
          { text: 'Оплата', value: 'payment' },
          { text: 'Дата выгрузки', value: 'due_date' },
          { text: 'Номер счёта', value: 'payment_number' }
        ],
        items: [
          {
            author: 'Виталий',
            client: 'Алексей',
            created_at: new Date(),
            payment: true,
            due_date: new Date(),
            payment_number: '123131asd'
          }, {
            author: 'Виталий',
            client: 'Алексей',
            created_at: new Date(),
            payment: true,
            due_date: new Date(),
            payment_number: '123131asd'
          }, {
            author: 'Виталий',
            client: 'Алексей',
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

    }
  }
</script>

<style scoped>

</style>
