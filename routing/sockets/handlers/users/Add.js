const BaseHandler = require('../../BaseHandler');

class Add extends BaseHandler {
    constructor(core, event) {
        super(core, event);
    }

    async handle(params, client) {
        if (!this.core.cfg.lang.accounts[params.role])
            return this.complete(client, null, 'Неизвестная роль для аккаунта');

        await this.core.db.users.add(params);
        this.complete(client, 'Аккаунт успешно добавлен');
    }

    get paramNames() {
        return ['login', 'password', 'role', 'name']
    }
}

module.exports = Add;