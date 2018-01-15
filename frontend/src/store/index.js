import Vue from 'vue'
import Vuex from 'vuex'
import router from './../router'
import progress from './../services/progress-service'
import socketTranslates from './socket-translates'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    socketConnected: false,
    activeRequests: [],
    requestsData: [],
    account: {},
    userData: {accounts: []}
  },
  mutations: {
    send_event(state, event, params) {
      state.activeRequests.push(event);
      state.requestsData.push({message: socketTranslates[event], params});
      changeProgressState(true);
    },

    SOCKET_CONNECT(state) {
      console.log('socket connect');

      setTimeout(() => {
        state.socketConnected = true;
        resendForbiddenRequests();
      }, 100);
    },
    SOCKET_DISCONNECT(state, reason) {
      state.socketConnected = false;
      console.log('socket disconnect', reason)
    },

    SOCKET_RESET_ADMIN(state, data) {
      Vue.prototype.$alert(data.type, data.result);
      state.activeRequests.splice(state.activeRequests.indexOf('reset_admin'), 1);
      changeProgressState(false);
    },
    SOCKET_USER_LIST(state, data) {
      if (data.type !== 'success')
        Vue.prototype.$alert(data.type, data.result);

      state.userData.accounts = data.result;
      state.activeRequests.splice(state.activeRequests.indexOf('user_list'), 1);
      changeProgressState(false);
    },
    SOCKET_SIGN_IN(state, data) {
      if (data.type !== 'success') {
        Vue.prototype.$alert(data.type, data.result);
        state.activeRequests.splice(state.activeRequests.indexOf('sign_in'), 1);
        return changeProgressState(false);
      }

      state.account = data.result;
      router.push(state.account.role);
      state.activeRequests.splice(state.activeRequests.indexOf('sign_in'), 1);
      changeProgressState(false);
    },
    SOCKET_USER_ADD(state, data) {
      if (data.type !== 'success')
        Vue.prototype.$alert(data.type, data.result);
      else
        state.userData.accounts.unshift({_id: data.result._id});

      state.activeRequests.splice(state.activeRequests.indexOf('user_add'), 1);
      changeProgressState(false);
    },
    SOCKET_USER_UPDATE(state, data) {
      if (data.type !== 'success')
        Vue.prototype.$alert(data.type, data.result);
      else {
        for (let i = 0; i < state.userData.accounts.length; i++) {
          if (state.userData.accounts[i]._id === data.result._id) {
            Object.assign(state.userData.accounts[i], data.result);
            break;
          }
        }
      }

      state.activeRequests.splice(state.activeRequests.indexOf('user_update'), 1);
      changeProgressState(false);
    },
    SOCKET_USER_DELETE(state, data) {
      if (data.type !== 'success')
        Vue.prototype.$alert(data.type, data.result);
      else {
        for (let i = 0; i < state.userData.accounts.length; i++) {
          if (state.userData.accounts[i]._id === data.result._id) {
            state.userData.accounts.splice(i, 1);
            break;
          }
        }
      }

      state.activeRequests.splice(state.activeRequests.indexOf('user_delete'), 1);
      changeProgressState(false);
    }
  },
  actions: {
    user_add({commit, state}) {
      sendEvent('user_add');
    },
    user_update({commit, state}, params) {
      sendEvent('user_update', params)
    },
    user_delete({commit, state}, params) {
      sendEvent('user_delete', params)
    },
    reset_admin({commit}, params) {
      sendEvent('reset_admin', params)
    },
    user_list({commit}) {
      sendEvent('user_list');
    },
    sign_in({commit}, params) {
      sendEvent('sign_in', params)
    }
  }
});

const sendEvent = (event, params, noCommit) => {
  if (store.state.socketConnected) {
    console.log('send', event, params);
    Vue.prototype.$socket.emit(event, params)
  }

  if (!noCommit)
    store.commit('send_event', event, params)
};

const resendForbiddenRequests = () => {
  for (let i = 0; i < store.state.activeRequests.length; i++) {
    sendEvent(store.state.activeRequests[i], store.state.requestsData[i].params, true);
  }
};

const changeProgressState = (val) => {
  if (!val && store.state.activeRequests.length !== 0)
    return;

  Vue.prototype.$progress.active = val;
};

export default store;
