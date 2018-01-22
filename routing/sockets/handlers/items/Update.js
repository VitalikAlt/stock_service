const BaseHandler = require('../../BaseHandler');

class Update extends BaseHandler {
    constructor(core, event) {
        super(core, event);
    }

    async handle(params, client) {
        await this.core.db.items.update({_id: params._id}, params);
        this.complete(client, params);
    }

    get paramNames() {
        return ['_id']
    }

    get target() {
        return 'auth';
    }

    get roleNames() {
        return ['booker']
    }
}

module.exports = Update;