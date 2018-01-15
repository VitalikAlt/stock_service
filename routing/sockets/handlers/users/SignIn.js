const BaseHandler = require('../../BaseHandler');

class SignIn extends BaseHandler {
    constructor(core, event) {
        super(core, event);
    }

    async handle(params, client) {
        try {
            const user = await this.core.db.users.getUser(params.login, params.password);

            if (!user)
                return this.complete(client, null, 'Логин или пароль неверен!');

            setTimeout(() => {
                this.complete(client, {role: user.role, id: user._id});
            }, 5000)
        } catch (err) {
            this.complete(client, null, 'Ошибка аутентификации');
        }
    }

    get paramNames() {
        return ['login', 'password']
    }
}

module.exports = SignIn;