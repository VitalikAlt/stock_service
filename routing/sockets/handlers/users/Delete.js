const BaseHandler = require('../../BaseHandler');

class Delete extends BaseHandler {
    constructor(core, event) {
        super(core, event);
    }

    async handle(params, client) {
        await this.core.db.users.deleteByIds([params.id]);
        this.complete(client, 'Аккаунт успешно удалён');
    }

    get paramNames() {
        return ['id']
    }
}

module.exports = Delete;