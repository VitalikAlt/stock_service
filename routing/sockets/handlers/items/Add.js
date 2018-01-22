const BaseHandler = require('../../BaseHandler');

class Add extends BaseHandler {
    constructor(core, event) {
        super(core, event);
    }

    async handle(params, client) {
        const newItem = await this.core.db.items.add(params);
        newItem._doc.reserves = 0;

        this.complete(client, newItem);
    }

    get target() {
        return 'auth';
    }

    get roleNames() {
        return ['booker']
    }
}

module.exports = Add;