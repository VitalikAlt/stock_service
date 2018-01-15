const Errors = require('./routes/Errors');

class BaseHandler {
    constructor(core, event) {
        this.core = core;
        this.event = event;
    }

    process(client, params) {
        if (!this.checkParams(client, params) || !this.checkRole(client))
            return;

        this.handle(params, client)
    }

    checkParams(client, params) {
        for (let i = 0; i < this.paramNames.length; i++) {
            if (!params || !params[this.paramNames[i]]) {
                client.emit(this.event, Errors.BAD_PARAMS(this.paramNames[i]));
                return null;
            }
        }

        return true;
    }

    checkRole(client) {
        return !this.roleNames || this.roleNames.indexOf(client.role) === -1;
    }

    handle(params, client) {
        client.emit(this.event, Errors.NO_HANDLER);
    }

    complete(client, successMsg, errMsg) {
        if (!errMsg)
            return client.emit(this.event, {type: 'success', result: successMsg});

        client.emit(this.event, {type: 'error', result: errMsg})
    }

    get paramNames() {
        return [];
    }

    get roleNames() {
        return null
    }
}

module.exports = BaseHandler;