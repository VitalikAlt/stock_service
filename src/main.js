import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import * as moment from 'vue-moment';
import DateTimePicker from './directives/DateTimePicker.vue';

import App from './App'
import router from './router'

import progress from './services/progress-service'

Vue.use(Vuetify);
Vue.use(moment);
Vue.use(progress);

Vue.component('v-datetime-picker', DateTimePicker);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
