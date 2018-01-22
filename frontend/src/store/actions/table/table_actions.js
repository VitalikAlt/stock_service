import Vue from 'vue'
import config from './../../../../config/shared'

class TableActions {
  constructor() {}

  static add(table, {state, commit}, data) {
    commit('remove_queue_event', `add_${table}`);

    if (data.type !== 'success')
      return Vue.prototype.$alert(data.type, data.result);

    if (config.sockets.copyright_tables.indexOf(table) !== -1) {
      console.log(data.result.user_id, state.account.id, data.result.user_id === state.account.id)
      data.result.creator = state.account.role === config.role.admin || data.result.user_id === state.account.id;
    }

    state.userData[table].unshift(data.result);
  }

  static update(table, {state, commit}, data) {
    commit('remove_queue_event', `update_${table}`);

    if (data.type !== 'success')
      return Vue.prototype.$alert(data.type, data.result);

    for (let i = 0; i < state.userData[table].length; i++) {
      if (state.userData[table][i]._id === data.result._id) {
        Object.assign(state.userData[table][i], data.result);
        break;
      }
    }
  }

  static delete(table, {state, commit}, data) {
    commit('remove_queue_event', `delete_${table}`);

    if (data.type !== 'success')
      return Vue.prototype.$alert(data.type, data.result);

    for (let i = 0; i < state.userData[table].length; i++) {
      if (state.userData[table][i]._id === data.result._id) {
        state.userData[table].splice(i, 1);
        break;
      }
    }
  }

  static lookup(table, {state, commit}, data) {
    commit('remove_queue_event', `lookup_${table}`);

    if (data.type !== 'success')
      return Vue.prototype.$alert(data.type, data.result);

    state.userData[table] = data.result;
  }
}

export default TableActions;
