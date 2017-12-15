import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import * as moment from 'vue-moment';

import App from './App'
import router from './router'

import progress from './services/progress-service'

Vue.use(Vuetify);
Vue.use(moment);
Vue.use(progress);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
