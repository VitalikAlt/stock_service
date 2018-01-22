import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import VTooltip from 'v-tooltip'
import Cookie from 'vue-cookie'
import VueSocketio from 'vue-socket.io'

import * as moment from 'vue-moment';
import DateTimePicker from './directives/DateTimePicker.vue';

import App from './App'
import store from './store'
import router from './router'

import alert from './services/alert-service'
import progress from './services/progress-service'

Vue.use(Cookie);
Vue.use(Vuetify);
Vue.use(VTooltip);
Vue.use(moment);
Vue.use(VueSocketio, 'http://localhost:8080', store);

Vue.use(alert);
Vue.use(progress);

Vue.component('v-datetime-picker', DateTimePicker);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
