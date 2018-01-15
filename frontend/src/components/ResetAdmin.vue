<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Восстановление администратора</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form v-model="valid" ref="resetForm">
              <v-flex xs12>
                <v-text-field label="Логин" v-model="login" :rules="defaultRule" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Пароль" type="password" v-model="password" :rules="defaultRule" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Секретный ключ" type="password" v-model="secret_key" :rules="defaultRule" required></v-text-field>
              </v-flex>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="reset" :disabled="!valid">Восстановить</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'Auth',
  data () {
    return {
      dialog: true,
      valid: false,
      login: '',
      password: '',
      name: '',
      secret_key: '',

      defaultRule: [
        (v) => !!v || 'Поле обязательно для заполнения',
        (v) => v && v.length <= 20 || 'Не более 20 символов'
      ]
    }
  },
  methods: {
    reset() {
      this.$store.dispatch('reset_admin', {login: this.login, password: this.password, secret_key: this.secret_key});
    }
  }
}
</script>

<style scoped>

</style>
