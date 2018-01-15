import Vue from 'vue'
import Vuex from 'vuex'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import VTooltip from 'v-tooltip'
import VueSocketio from 'vue-socket.io';

import * as moment from 'vue-moment';
import DateTimePicker from './directives/DateTimePicker.vue';

import App from './App'
import store from './store'
import router from './router'

import alert from './services/alert-service'
import progress from './services/progress-service'

Vue.use(Vuex);
Vue.use(alert);
Vue.use(Vuetify);
Vue.use(VTooltip);
Vue.use(VueSocketio, 'http://localhost:8080', store);
Vue.use(moment);
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
