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
          <v-tabs v-model="active">
            <v-tabs-bar class="grey" dark>
              <v-tabs-item href="#manager" ripple>Менеджеры</v-tabs-item>
              <v-tabs-item href="#workshop" ripple>Цех</v-tabs-item>
              <v-tabs-slider color="black"></v-tabs-slider>
            </v-tabs-bar>
            <v-tabs-items>
              <v-tabs-content id="manager">
                <v-data-table
                  v-bind:headers="managerHeaders"
                  :items.sync="managerItems"
                  class="elevation-1"
                >
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.author }}</td>
                    <td class="text-xs-right">{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.count }}</td>
                    <td class="text-xs-right">{{ props.item.growth }}</td>
                    <td class="text-xs-right">{{ props.item.size }}</td>
                    <td class="text-xs-right">{{ props.item.workshop }}</td>
                    <td class="text-xs-right">{{ props.item.create_date | moment("DD/MM/YYYY, HH:mm") }}</td>
                    <td class="text-xs-right">{{ props.item.due_date | moment("DD/MM/YYYY, HH:mm") }}</td>
                  </template>
                </v-data-table>
              </v-tabs-content>
              <v-tabs-content id="workshop">
                <v-data-table
                  v-bind:headers="workshopHeaders"
                  :items.sync="workshopItems"
                  class="elevation-1"
                >
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.author }}</td>
                    <td class="text-xs-right">{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.count }}</td>
                    <td class="text-xs-right">{{ props.item.growth }}</td>
                    <td class="text-xs-right">{{ props.item.size }}</td>
                    <td class="text-xs-right">{{ props.item.due_date | moment("DD/MM/YYYY, HH:mm") }}</td>
                  </template>
                </v-data-table>
              </v-tabs-content>
            </v-tabs-items>
          </v-tabs>
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
    name: 'ReservesSewerModal',
    props: ['itemId', 'reservesDialog'],
    data() {
      return {
        active: null,
        progress: this.$progress,
        managerHeaders: [
          {
            text: 'Менеджер',
            align: 'left',
            value: 'author'
          },
          { text: 'Наименование', value: 'name' },
          { text: 'Количество', value: 'count' },
          { text: 'Рост', value: 'grow' },
          { text: 'Размер', value: 'size' },
          { text: 'Цех производства', value: 'workshop' },
          { text: 'Дата пошива', value: 'create_date' },
          { text: 'Дата выгрузки', value: 'due_date' }
        ],
        workshopHeaders: [
          {
            text: 'Создатель',
            align: 'left',
            value: 'author'
          },
          { text: 'Наименование', value: 'name' },
          { text: 'Количество', value: 'count' },
          { text: 'Рост', value: 'grow' },
          { text: 'Размер', value: 'size' },
          { text: 'Дата', value: 'due_date' }
        ],
        managerItems: [
          {
            author: 'Виталий',
            name: 'Товар1',
            count: 5,
            size: '44:46',
            growth: 1,
            workshop: 1,
            create_date: new Date(),
            due_date: new Date()
          }, {
            author: 'Виталий',
            name: 'Товар1',
            count: 15,
            size: '48:50',
            growth: 1,
            workshop: 1,
            create_date: new Date(),
            due_date: new Date()
          }, {
            author: 'Виталий',
            name: 'Товар2',
            count: 10,
            size: '44:46',
            growth: 1,
            workshop: 1,
            create_date: new Date(),
            due_date: new Date()
          }
        ],
        workshopItems: [
          {
            author: 'Виталий',
            name: 'Товар1',
            count: 10,
            size: '44:46',
            growth: 1,
            due_date: new Date()
          }, {
            author: 'Виталий',
            name: 'Товар1',
            count: 15,
            size: '48:50',
            growth: 1,
            due_date: new Date()
          }, {
            author: 'Виталий',
            name: 'Товар2',
            count: 5,
            size: '44:46',
            growth: 1,
            due_date: new Date()
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
