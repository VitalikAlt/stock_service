import TableActions from './table_actions'

class Tables {
  constructor() { }

  static addTablesMethods(object, {tables, table_events}) {
    for(let i = 0; i < tables.length; i++) {
      for(let j = 0; j < table_events.length; j++) {
        const event = `${table_events[j]}_${tables[i]}`;
        const camelCasedEvent = `socket_${table_events[j]}${tables[i].replace(/(\b(.))|(_\w)/g, (s) => {
          if (s[0] === '_')
            s = s[1];
          
          return s.toUpperCase()
        })}`;

        object[event] = function ({commit}, params) {
          commit('send_event', {event, params})
        };

        object[camelCasedEvent] = TableActions[table_events[j]].bind(null, tables[i])
      }
    }
  }
}

export default Tables;
