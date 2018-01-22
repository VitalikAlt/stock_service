const BaseHandler = require('../../BaseHandler');

class Paid extends BaseHandler {
    constructor(core, event) {
        super(core, event);
    }

    async handle(params, client) {
        this.complete(client, await this.core.db.reserves.getFuturePaid());
    }

    get roleNames() {
        return ['storekeeper']
    }
}

module.exports = Paid;