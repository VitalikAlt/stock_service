const BaseHandler = require('../../BaseHandler');

class List extends BaseHandler {
    constructor(core, event) {
        super(core, event);
    }

    async handle(params, client) {
        const items = await this.core.db.items.all;

        for (let i = 0; i < items.length; i++) {
            items[i]._doc.reserves = await this.core.db.reserves.getCountByItemId(items[i]._id);
        }

        this.complete(client, items);
    }

    get roleNames() {
        return ['booker', 'manager', 'seamstress', 'deputy', 'storekeeper']
    }
}

module.exports = List;