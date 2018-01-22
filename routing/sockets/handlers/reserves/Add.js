const BaseHandler = require('../../BaseHandler');

class Add extends BaseHandler {
    constructor(core, event) {
        super(core, event);
    }

    async handle(params, client) {
        params.user_id = client.id;

        const newReserve = await this.core.db.reserves.add(params);
        newReserve._doc.author = (await this.core.db.users.getById(client.id)).name;

        this.complete(client, newReserve);
    }

    get paramNames() {
        return ['item_id']
    }

    get target() {
        return ['booker', 'manager', 'seamstress', 'deputy']
    }

    get roleNames() {
        return ['booker', 'manager', 'seamstress', 'deputy']
    }
}

module.exports = Add;