const BaseHandler = require('../../BaseHandler');

class Update extends BaseHandler {
    constructor(core, event) {
        super(core, event);
    }

    async handle(params, client) {
        const reserve = await this.core.db.reserves.getById(params._id);

        if (!reserve)
            return this.sendEvent(client, null, 'Данного резерва не существует, перезагрузите страницу!');

        if (client.role !== 'booker' && client.id !== reserve.user_id)
            return this.sendEvent(client, null, 'У вас нет прав для данрого действия!');

        this.deleteProtectedFields(params);

        await this.core.db.reserves.update({_id: params._id}, params);
        this.complete(client, params);

        await this.sendUpdateItemsToAuthorizedUsers(client, reserve.item_id);
    }

    deleteProtectedFields(params) {
        delete params.user_id;
        delete params.item_id;
        delete params.creator;
    }

    async sendUpdateItemsToAuthorizedUsers(client, item_id) {
        const reserves = await this.core.db.reserves.getCountByItemId(item_id);
        this.sendEvent(this.toAuthorizedUsers(client), {_id: item_id, reserves}, null, 'update_items');
    }

    get paramNames() {
        return ['_id']
    }

    get target() {
        return ['booker', 'manager', 'seamstress', 'deputy']
    }

    get roleNames() {
        return ['booker', 'manager', 'seamstress', 'deputy']
    }
}

module.exports = Update;