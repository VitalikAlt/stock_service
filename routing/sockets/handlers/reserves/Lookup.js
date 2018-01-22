const BaseHandler = require('../../BaseHandler');

class List extends BaseHandler {
    constructor(core, event) {
        super(core, event);
    }

    async handle(params, client) {
        const reserves = await this.core.db.reserves.getByItemId(params.item_id);

        for (let i = 0; i < reserves.length; i++) {
            reserves[i]._doc.author = (await this.core.db.users.getById(reserves[i].user_id)).name;

            reserves[i]._doc.creator = client.id === reserves[i].user_id || client.role === 'booker';

            if (client.id !== reserves[i].user_id)
                delete reserves[i]._doc.client;
        }

        this.complete(client, reserves);
    }

    get paramNames() {
        return ['item_id']
    }

    get roleNames() {
        return ['booker', 'manager', 'seamstress', 'deputy']
    }
}

module.exports = List;