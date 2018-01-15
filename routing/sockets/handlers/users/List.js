const BaseHandler = require('../../BaseHandler');

class List extends BaseHandler {
    constructor(core, event) {
        super(core, event);
    }

    async handle(params, client) {
        const res = await this.core.db.users.all;

        for (let i = 0; i < res.length; i++) {
            res[i]._doc.role = this.core.cfg.lang.roles[res[i].role];
        }

        this.complete(client, res);
    }
}

module.exports = List;