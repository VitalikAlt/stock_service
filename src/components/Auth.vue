<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Авторизация</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Логин" v-model="login" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Пароль" type="password" v-model="password" required></v-text-field>
              </v-flex>
              <v-checkbox
                label="Запомнить меня?"
                v-model="rememberMe"
              ></v-checkbox>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="signIn">Войти</v-btn>
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
      rememberMe: false,
      login: '',
      password: ''
    }
  },
  methods: {
    signIn() {
      this.$router.push('manager')
    }
  }
}
</script>

<style scoped>

</style>
