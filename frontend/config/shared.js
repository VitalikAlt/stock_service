export default {
  sockets: {
    translates: {
      'sign_in': 'Аутентификация',
      'reset_admin': 'Восстановление профиля админа',

      'add_users': 'Добавление аккаунта',
      'update_users': 'Редактирование аккаунта',
      'delete_users': 'Удаление аккаунта',
      'lookup_users': 'Получение списка аккаунтов',

      'add_items': 'Добавление товара',
      'update_items': 'Редактирование товара',
      'delete_items': 'Удаление товара',
      'lookup_items': 'Получение списка товаров',

      'add_reserves': 'Добавление резерва',
      'update_reserves': 'Редактирование резерва',
      'delete_reserves': 'Удаление резерва',
      'lookup_reserves': 'Получение списка резервов',
    },
    tables: ['users', 'items', 'reserves', 'workshop_reserves'],
    copyright_tables: ['reserves', 'workshop_reserves'],
    table_events: ['add', 'update', 'delete', 'lookup']
  },

  role: {
    admin: 'booker'
  }
}
