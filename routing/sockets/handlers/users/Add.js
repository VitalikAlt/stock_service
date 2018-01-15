const BaseHandler = require('../../BaseHandler');

class Add extends BaseHandler {
    constructor(core, event) {
        super(core, event);
    }

    async handle(params, client) {
        this.complete(client, await this.core.db.users.add(params));
    }

    get target() {
        return 'group';
    }
}

module.exports = Add;