const BaseRoute = require(appRoot + '/routing/BaseRoute');

class ChangePasswordRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['login', 'new_password', 'sender'];
    }

    async handle() {
        try {
            if (!(await this.checkSender()))
                return this.complete(null, 'Error: no permission', 'No permission for this action!');

            if (!(await this.core.db.users.getByLogin(this.params.login)))
                return this.complete(null, 'Error: incorrect data', 'No user with that login!');

            await this.core.db.users.updatePassword(this.params.login, this.params.new_password);
            this.complete(true);
        } catch (err) {
            this.core.log.error('ChangePassword', err);
            this.complete(null, err, 'ChangePassword error');
        }
    }

    async checkSender() {
        if (!this.params.sender.login || !this.params.sender.password)
            return false;

        const user = await this.core.db.users.getUser(this.params.sender.login, this.params.sender.password);
        return !(!user || user.role !== 'admin' && (user.login !== this.params.login || user.password !== this.params.old_password));
    }
}

module.exports = ChangePasswordRoute;