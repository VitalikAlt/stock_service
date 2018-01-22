<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Авторизация</span>
          <v-spacer></v-spacer>
          <v-progress-circular v-if="progress.active" indeterminate color="black" style="margin-right: 8px;" v-tooltip.bottom="progress.status"></v-progress-circular>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form v-model="valid" ref="authForm">
              <v-flex xs12>
                <v-text-field label="Логин" v-model="login" :rules="defaultRule" @keyup.enter="signIn" autofocus></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="Пароль" type="password" v-model="password" :rules="defaultRule" @keyup.enter="signIn"></v-text-field>
              </v-flex>

              <v-checkbox
                label="Запомнить меня?"
                v-model="rememberMe"
              ></v-checkbox>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="signIn" :disablde="valid">Войти</v-btn>
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
      rememberMe: true,
      login: 'booker1',
      password: '2',
      progress: this.$progress,
      account: this.$store.state.account,

      defaultRule: [
        (v) => !!v || 'Поле обязательно для заполнения',
        (v) => v && v.length <= 20 || 'Не более 20 символов'
      ]
    }
  },
  methods: {
    signIn() {
      console.log(this.rememberMe)
      this.$store.dispatch('sign_in', {login: this.login, password: this.password, remember: this.rememberMe});
    }
  }
}
</script>

<style scoped>

</style>
