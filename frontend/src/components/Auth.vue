<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Авторизация</span>
          <v-spacer></v-spacer>
          <v-progress-circular v-if="$progress.active" indeterminate color="black" style="margin-right: 8px;" v-tooltip.bottom="$progress.status"></v-progress-circular>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Логин" v-model="login" required></v-text-field>
                <!--<v-select-->
                  <!--v-bind:items="['Мэнеджер', 'Швея', 'Бухгалтер', 'Зам. директора', 'Кладовщик']"-->
                  <!--v-model="login"-->
                  <!--label="Логин"-->
                  <!--single-line-->
                  <!--bottom-->
                <!--&gt;</v-select>-->
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Пароль (не нужно)" type="password" v-model="password" required></v-text-field>
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
      login: 'booker1',
      password: '2',
      progress: this.$progress,
      account: this.$store.state.account
    }
  },
  methods: {
    async signIn() {
      this.$store.dispatch('sign_in', {login: this.login, password: this.password});

      switch (this.login) {
        case 'Мэнеджер':
          this.$router.push('manager');
          break;
        case 'Швея':
          this.$router.push('seamstress');
          break;
        case 'Бухгалтер':
          this.$router.push('booker');
          break;
        case 'Зам. директора':
          this.$router.push('deputy');
          break;
        case 'Кладовщик':
          this.$router.push('storekeeper');
          break;
      }
    }
  },
  computed: {
    role() {
      if (this.$store.state.account.role)
        console.log('asdasd')

      return this.$store.state.account.role;
    }
  }
}
</script>

<style scoped>

</style>
