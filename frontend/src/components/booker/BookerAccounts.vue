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
        :items="userData.users"
        :pagination.sync="pagination"
        :search="search"
        :loading="$progress.queue.indexOf('lookup_users') !== -1"
        class="elevation-2"
      >
        <template slot="items" slot-scope="props">
          <td class="column-compressed">{{ props.index + 1 }}</td>
          <td class="text-xs-right">
            <v-select
              :items="roles"
              v-model="props.item.role"
              label="Роль"
              @input="updateRow(props.item)"
              class="table-select"
              single-line
              bottom
            ></v-select>
          </td>
          <td class="text-xs-right">
            <v-text-field
              slot="input"
              class="right-input"
              v-model="props.item.login"
              @blur="updateRow(props.item)"
            ></v-text-field>
          </td>
          <td class="text-xs-right">
            <v-text-field
              slot="input"
              class="right-input"
              type="password"
              v-model="props.item.password"
              @blur="updateRow(props.item)"
            ></v-text-field>
          </td>
          <td class="text-xs-right">
            <v-text-field
              slot="input"
              class="right-input"
              v-model="props.item.name"
              @blur="updateRow(props.item)"
            ></v-text-field>
          </td>
          <td class="column-compressed">
            <v-icon class="pointer delete-action" @click="deleteRow(props.item)">delete_forever</v-icon>
          </td>
        </template>
      </v-data-table>
    </v-layout>
    <v-layout justify-center>
      <v-btn color="primary" outline large @click.native="addRow()">Добавить</v-btn>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: 'BookerAccounts',
    data() {
      return {
        currentItem: 0,
        search: '',
        pagination: {sortBy: ''},
        headers: [
          {
            text: 'Номер',
            align: 'left',
            sortable: false,
            value: 'role'
          },
          { text: 'Роль', value: 'role' },
          { text: 'Логин', value: 'login' },
          { text: 'Пароль', value: 'password' },
          { text: 'Имя', value: 'name' },
          { text: '', sortable: false, value: 'name'}
        ],
        roles: ['Бухгалтер', 'Мэнеджер', 'Кладовщик', 'Технолог', 'Зам. директора'],
        userData: this.$store.state.userData
      }
    },
    methods: {
      addRow() {
        this.$store.dispatch('add_users');
      },
      updateRow(el) {
        if (!el.role)
          return this.$alert('error', 'Сначала добавьте роль');

        this.$store.dispatch('update_users', el);
      },
      deleteRow(el) {
        this.$store.dispatch('delete_users', {id: el._id});
      }
    }
  }
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>
