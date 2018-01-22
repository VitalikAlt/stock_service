import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    socketConnected: false,
    activeRequests: [],
    requestsData: [],
    account: {},
    userData: {users: [], items: [], reserves: [], workshop_reserves: [], paid_reserves: []}
  },
  mutations,
  actions
});

export default store;
