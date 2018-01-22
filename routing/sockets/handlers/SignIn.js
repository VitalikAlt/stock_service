const crypto = require('crypto');
const BaseHandler = require('../BaseHandler');

class SignIn extends BaseHandler {
    constructor(core, event) {
        super(core, event);
        this.cipher = crypto.createCipher('aes-256-cbc', this.core.cfg.secret.crypto_key);
    }

    async handle(params, client) {
        try {
            if (params.token)
                Object.assign(params, this.decryptAuthToken(params.token));

            const user = await this.core.db.users.getUser(params.login, params.password);

            if (!user)
                return this.complete(client, null, 'Логин или пароль неверен!');

            client.join(user.role);
            client.id = String(user._id);
            client.role = user.role;

            const token = this.encryptAuthToken(user);
            client.handshake.headers.cookie += `;auth_token=${token}`;

            this.complete(client, {role: user.role, id: user._id, token});
        } catch (err) {
            console.log(err)
            this.complete(client, null, 'Ошибка аутентификации');
        }
    }

    encryptAuthToken(user) {
        const userData = JSON.stringify({login: user.login, password: user.password});
        let token = this.cipher.update(userData, 'utf8', 'base64');
        token += this.cipher.final('base64');
        return token;
    }
}

module.exports = SignIn;