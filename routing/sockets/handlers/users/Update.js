const BaseHandler = require('../../BaseHandler');

class Update extends BaseHandler {
    constructor(core, event) {
        super(core, event);
    }

    async handle(params, client) {
        let translateRole = false;
        const updatedUser = Object.assign({}, params);

        for (const role in this.core.cfg.lang.roles) {
            if (this.core.cfg.lang.roles[role] === params.role) {
                updatedUser.role = role;
                translateRole = true;
                break;
            }
        }

        if (!translateRole)
            return this.complete(client, null, 'Неизвестная роль');

        await this.core.db.users.update({_id: params._id}, updatedUser);
        this.complete(client, params);
    }

    get paramNames() {
        return ['_id']
    }

    get target() {
        return 'group';
    }
}

module.exports = Update;