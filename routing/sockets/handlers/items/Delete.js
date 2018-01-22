const BaseHandler = require('../../BaseHandler');

class Delete extends BaseHandler {
    constructor(core, event) {
        super(core, event);
    }

    async handle(params, client) {
        await this.core.db.items.deleteById(params._id);
        this.complete(client, {_id: params._id});
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

module.exports = Delete;