const BaseHandler = require('../../BaseHandler');

class Update extends BaseHandler {
    constructor(core, event) {
        super(core, event);
    }

    async handle(params, client) {
        await this.core.db.users.update({_id: params.id}, params);
        this.complete(client, 'Аккаунт успешно изменён');
    }

    get paramNames() {
        return ['id']
    }
}

module.exports = Update;