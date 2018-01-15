const BaseHandler = require('../../BaseHandler');

class Delete extends BaseHandler {
    constructor(core, event) {
        super(core, event);
    }

    async handle(params, client) {
        await this.core.db.users.deleteByIds([params.id]);
        this.complete(client, {_id: params.id});
    }

    get paramNames() {
        return ['id']
    }

    get target() {
        return 'group';
    }
}

module.exports = Delete;