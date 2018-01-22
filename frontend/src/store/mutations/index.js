import Vue from 'vue'
import config from './../../../config/shared'

const mutations = {
  send_event(state, {event, params, no_commit}) {
    if (state.socketConnected) {
      console.log('send', event, params);
      Vue.prototype.$socket.emit(event, params)
    }

    if (!no_commit)
      this.commit('add_queue_event', {event, params})
  },

  add_queue_event(state, data) {
    state.activeRequests.push(data.event);
    state.requestsData.push({message: config.sockets.translates[data.event], params: data.params});
    Vue.prototype.$progress.active = true;
  },

  remove_queue_event(state, event) {
    const index = state.activeRequests.indexOf(event);
    state.activeRequests.splice(index, 1);
    state.requestsData.splice(index, 1);

    if (state.activeRequests.length === 0)
      Vue.prototype.$progress.active = false;
  },

  setup_cookie(state, {role, token, remember}) {
    Vue.prototype.$cookie.set('auth_token', token);
  },

  drop_auth_token(state) {
    Vue.prototype.$cookie.delete('auth_token');
  }
};

export default mutations;
