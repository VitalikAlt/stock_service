<template>
  <div>
    <v-dialog v-model="dialog" max-width="100%" scrollable>
      <v-card>
        <v-card-title class="headline">
          Резервы: {{item.reserves}}
          <v-spacer></v-spacer>
          <v-progress-circular v-if="progress.active" indeterminate color="blue" v-tooltip.bottom="progress.status"></v-progress-circular>
        </v-card-title>

        <v-card-text>
          <v-tabs v-model="active" grow>
            <v-tabs-bar class="indigo lighten-1 elevation-3" dark>
              <v-tabs-item href="#manager" @click="currentTable = 'reserves'" ripple>Менеджеры</v-tabs-item>
              <v-tabs-item href="#workshop" @click="currentTable = 'workshop_reserves'" ripple>Цех</v-tabs-item>
              <v-tabs-slider color="amber"></v-tabs-slider>
            </v-tabs-bar>
            <v-tabs-items>
              <v-tabs-content id="manager">
                <v-layout row>
                  <v-spacer></v-spacer>
                  <v-text-field
                    append-icon="search"
                    label="Поиск"
                    single-line
                    hide-details
                    v-model="managerSearch"
                  ></v-text-field>
                </v-layout>

                <v-layout row>
                  <v-data-table
                    v-bind:headers="managerHeaders"
                    :items.sync="userData.reserves"
                    :pagination.sync="pagination"
                    :search="managerSearch"
                    :loading="$progress.queue.indexOf('lookup_reserves') !== -1"
                    class="elevation-2"
                  >
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.author }}</td>

                      <td class="text-xs-right">
                        <v-text-field
                          slot="input"
                          class="right-input"
                          v-model="props.item.name"
                          @blur="updateRow(props.item)"
                          v-if="props.item.creator"
                        ></v-text-field>

                        <span v-if="!props.item.creator">{{ props.item.name }}</span>
                      </td>

                      <td class="text-xs-right">
                        <v-text-field
                          slot="input"
                          class="right-input"
                          v-model="props.item.count"
                          @blur="updateRow(props.item)"
                          v-if="props.item.creator"
                        ></v-text-field>

                        <span v-if="!props.item.creator">{{ props.item.count }}</span>
                      </td>

                      <td class="text-xs-right">
                        <v-text-field
                          slot="input"
                          class="right-input"
                          v-model="props.item.growth"
                          @blur="updateRow(props.item)"
                          v-if="props.item.creator"
                        ></v-text-field>

                        <span v-if="!props.item.creator">{{ props.item.growth }}</span>
                      </td>

                      <td class="text-xs-right">
                        <v-text-field
                          slot="input"
                          class="right-input"
                          v-model="props.item.size"
                          @blur="updateRow(props.item)"
                          v-if="props.item.creator"
                        ></v-text-field>

                        <span v-if="!props.item.creator">{{ props.item.size }}</span>
                      </td>

                      <td class="text-xs-right">
                        <v-text-field
                          slot="input"
                          class="right-input"
                          v-model="props.item.workshop"
                          @blur="updateRow(props.item)"
                          v-if="props.item.creator"
                        ></v-text-field>

                        <span v-if="!props.item.creator">{{ props.item.workshop }}</span>
                      </td>

                      <td class="text-xs-right">
                        <v-datetime-picker

                          :id="props.item.created_at"
                          :datetime="props.item.create_date"
                          @update="(val) => {props.item.create_date = val; updateRow(props.item)}"
                          v-if="props.item.creator"
                        ></v-datetime-picker>

                        <span v-if="!props.item.creator">{{ props.item.create_date | moment("DD/MM/YYYY, HH:mm") }}</span>
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
                        <v-icon class="delete-action" @click="deleteRow(props.item)" v-if="props.item.creator">delete_forever</v-icon>
                      </td>
                    </template>
                  </v-data-table>
                </v-layout>
              </v-tabs-content>
              <v-tabs-content id="workshop">
                <v-layout row>
                  <v-spacer></v-spacer>
                  <v-text-field
                    append-icon="search"
                    label="Поиск"
                    single-line
                    hide-details
                    v-model="workshopSearch"
                  ></v-text-field>
                </v-layout>

                <v-layout row>
                  <v-data-table
                    v-bind:headers="workshopHeaders"
                    :items.sync="userData.workshop_reserves"
                    :pagination.sync="pagination"
                    :search="workshopSearch"
                    :loading="$progress.queue.indexOf('lookup_workshop_reserves') !== -1"
                    class="elevation-1"
                  >
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.author }}</td>

                      <td class="text-xs-right">
                        <v-text-field
                          slot="input"
                          class="right-input"
                          v-model="props.item.name"
                          @blur="updateRow(props.item)"
                          v-if="props.item.creator"
                        ></v-text-field>

                        <span v-if="!props.item.creator">{{ props.item.name }}</span>
                      </td>

                      <td class="text-xs-right">
                        <v-text-field
                          slot="input"
                          class="right-input"
                          v-model="props.item.count"
                          @blur="updateRow(props.item)"
                          v-if="props.item.creator"
                        ></v-text-field>

                        <span v-if="!props.item.creator">{{ props.item.count }}</span>
                      </td>

                      <td class="text-xs-right">
                        <v-text-field
                          slot="input"
                          class="right-input"
                          v-model="props.item.growth"
                          @blur="updateRow(props.item)"
                          v-if="props.item.creator"
                        ></v-text-field>

                        <span v-if="!props.item.creator">{{ props.item.growth }}</span>
                      </td>

                      <td class="text-xs-right">
                        <v-text-field
                          slot="input"
                          class="right-input"
                          v-model="props.item.size"
                          @blur="updateRow(props.item)"
                          v-if="props.item.creator"
                        ></v-text-field>

                        <span v-if="!props.item.creator">{{ props.item.size }}</span>
                      </td>

                      <td class="text-xs-right">
                        <v-datetime-picker
                          :datetime="props.item.due_date"
                          @update="(val) => {props.item.create_date = val; updateRow(props.item)}"
                          v-if="props.item.creator"
                        ></v-datetime-picker>

                        <span v-if="!props.item.creator">{{ props.item.due_date | moment("DD/MM/YYYY, HH:mm") }}</span>
                      </td>

                      <td class="text-xs-right">
                        <v-icon class="delete-action" @click="deleteRow(props.item)" v-if="props.item.creator">delete_forever</v-icon>
                      </td>
                    </template>
                  </v-data-table>
                </v-layout>
              </v-tabs-content>
            </v-tabs-items>
          </v-tabs>
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
    name: 'ReservesSewerModal',
    props: ['item', 'reservesDialog'],
    data() {
      return {
        active: null,
        managerSearch: '',
        workshopSearch: '',
        pagination: {sortBy: ''},
        progress: this.$progress,
        currentTable: 'reserves',
        userData: this.$store.state.userData,
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
        ]
      }
    },
    created() {

    },
    methods: {
      addRow: function() {
        this.$store.dispatch(`add_${this.currentTable}`, {item_id: this.item._id});
      },
      updateRow(el) {
        this.$store.dispatch(`update_${this.currentTable}`, el);
      },
      deleteRow(el) {
        this.$store.dispatch(`delete_${this.currentTable}`, {_id: el._id});
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
  }
</script>

<style scoped>

</style>
