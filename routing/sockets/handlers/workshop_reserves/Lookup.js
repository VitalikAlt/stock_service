const BaseHandler = require('../../BaseHandler');

class List extends BaseHandler {
    constructor(core, event) {
        super(core, event);
    }

    async handle(params, client) {
        const workshopReserves = await this.core.db.workshopReserves.getByItemId(params.item_id);

        for (let i = 0; i < workshopReserves.length; i++) {
            workshopReserves[i]._doc.author = (await this.core.db.users.getById(workshopReserves[i].user_id)).name;

            if (client.id === workshopReserves[i].user_id || client.role === 'booker')
                workshopReserves[i]._doc.creator = true;
        }

        this.complete(client, workshopReserves);
    }

    get paramNames() {
        return ['item_id']
    }

    get target() {
        return ['booker', 'seamstress', 'deputy']
    }

    get roleNames() {
        return ['booker', 'seamstress', 'deputy']
    }
}

module.exports = List;