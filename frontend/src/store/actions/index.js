import Vue from 'vue'
import tables from './table'
import router from './../../router'
import config from './../../../config/shared'

const actions = {
  reset_admin({commit}, params) {
    commit('send_event', {event: 'reset_admin', params})
  },
  sign_in({commit, state}, params) {
    state.account.remember = params.remember;
    commit('send_event', {event: 'sign_in', params})
  },
  sign_out({commit, state}, params) {
    Vue.prototype.$cookie.delete('auth_token');
    router.push('/');
  },
  lookup_paid_reserves({commit, state}) {
    commit('send_event', {event: 'lookup_paid_reserves'})
  },
  socket_connect({commit, state}, params) {
    console.log('socket connect');

    const auth_token = Vue.prototype.$cookie.get('auth_token');

    if (auth_token)
      commit('send_event', {event: 'sign_in', params: {token: auth_token}});

    setTimeout(() => {
      state.socketConnected = true;

      for (let i = 0; i < state.activeRequests.length; i++) {
        commit('send_event', {event: state.activeRequests[i], params: state.requestsData[i].params, no_commit: true});
      }
    }, 100);
  },
  socket_disconnect({commit, state}, reason) {
    state.socketConnected = false;
    console.log('socket disconnect', reason)
  },
  socket_reset_admin({commit, state}, data) {
    Vue.prototype.$alert(data.type, data.result);
    commit('remove_queue_event', 'reset_admin');
  },
  socket_signIn({commit, state}, data) {
    commit('remove_queue_event', 'sign_in');

    if (data.type !== 'success') {
      Vue.prototype.$alert(data.type, data.result);

      if (router.history.current.name !== 'Auth') {
        Vue.prototype.$cookie.delete('auth_token');
        router.push('/')
      }

      return;
    }

    state.account.id = data.result.id;
    state.account.role = data.result.role;

    if (state.account.remember)
      Vue.prototype.$cookie.set('auth_token', data.result.token);

    router.push(`/${data.result.role}`);
  },
  socket_lookupPaidReserves({commit, state}, data) {
    commit('remove_queue_event', `lookup_paid_reserves`);

    if (data.type !== 'success')
      return Vue.prototype.$alert(data.type, data.result);

    state.userData.paid_reserves = data.result;
  },
};

tables.addTablesMethods(actions, config.sockets);

export default actions;
