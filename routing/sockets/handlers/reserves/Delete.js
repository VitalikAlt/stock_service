const BaseHandler = require('../../BaseHandler');

class Delete extends BaseHandler {
    constructor(core, event) {
        super(core, event);
    }

    async handle(params, client) {
        if (client.role !== 'booker' && client.id !== (await this.core.db.reserves.getById(params._id)).user_id)
            return this.sendEvent(client, null, 'У вас нет прав для данрого действия!');

        await this.core.db.reserves.deleteById(params._id);
        this.complete(client, {_id: params._id});
    }

    get paramNames() {
        return ['_id']
    }

    get target() {
        return ['booker', 'manager', 'seamstress', 'deputy']
    }

    get roleNames() {
        return ['booker', 'manager', 'seamstress', 'deputy']
    }
}

module.exports = Delete;