const cookie = require('cookie');
const crypto = require('crypto');
const Errors = require('./routes/Errors');

class BaseHandler {
    constructor(core, event) {
        this.core = core;
        this.event = event;
        this.decipher = crypto.createDecipher('aes-256-cbc', this.core.cfg.secret.crypto_key);
    }

    async process(client, params) {
        if (!this.checkParams(client, params) || !(await this.checkRole(client, params)))
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

    async checkRole(client, params) {
        if (!this.roleNames)
            return true;

        let handshakeData = client.request;
        handshakeData = cookie.parse(handshakeData.headers.cookie || '');
        handshakeData = handshakeData.auth_token;

        let user = this.decryptAuthToken(handshakeData);
        user = await this.core.db.users.getUser(user.login, user.password);

        if (!user) {
            client.emit('sign_in', {type: 'error', result: 'Ошибка аутентификации'});
            return false;
        }

        if (this.roleNames.indexOf(user.role) === -1) {
            this.complete(client, null, 'У вас нет прав для данрого действия!');
            return false;
        }

        return true;
    }

    decryptAuthToken(token) {
        if (!token)
            return {};

        let decryptedToken = this.decipher.update(token, 'base64', 'utf8');
        decryptedToken += this.decipher.final('utf8');
        return JSON.parse(decryptedToken);
    }

    handle(params, client) {
        client.emit(this.event, Errors.NO_HANDLER);
    }

    complete(client, successMsg, errMsg) {
        let target = client;
        console.log('complete', this.event, successMsg);

        switch (this.target) {
            case 'auth':
                target = this.toAuthorizedUsers(target);
                break;
            case 'role':
                target = target.to(client.role);
                break;
        }

        if (Array.isArray(this.target)) {
            for (let i = 0; i < this.target.length; i++) {
                target = target.to(this.target[i])
            }
        }

        this.sendEvent(target, successMsg, errMsg)
    }

    sendEvent(target, successMsg, errMsg, event) {
        if (!errMsg)
            return target.emit(event || this.event, {type: 'success', result: successMsg});

        target.emit(event || this.event, {type: 'error', result: errMsg});
    }


    toAuthorizedUsers(client) {
        let target = client;

        const allowedRoles = Object.keys(this.core.cfg.lang.roles);

        for(let i = 0; i < allowedRoles.length; i++) {
            target = target.to(allowedRoles[i])
        }

        return target;
    }

    get paramNames() {
        return [];
    }

    get roleNames() {
        return null
    }

    get target() {
        return 'client'
    }
}

module.exports = BaseHandler;