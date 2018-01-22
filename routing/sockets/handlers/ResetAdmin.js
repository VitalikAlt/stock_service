const BaseHandler = require('../BaseHandler');

class ResetAdmin extends BaseHandler {
    constructor(core, event) {
        super(core, event);
    }

    async handle(params, client) {
        if (params.secret_key !== this.core.cfg.secret.reset_key)
            return this.complete(client, null, 'Секретный ключ не верен!');

        await this.core.db.users.adminReset(params.login, params.password);
        this.complete(client, 'Профиль восстановлен');
    }

    get paramNames() {
        return ['login', 'password', 'secret_key']
    }
}

module.exports = ResetAdmin;