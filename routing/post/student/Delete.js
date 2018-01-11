const BaseRoute = require(appRoot + '/routing/BaseRoute');

class StudentDeleteRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['ids'];
    }

    get roles() {
        return ['admin']
    }

    async handle() {
        try {
            const userIds = await this.core.db.studentProfile.getUserIds(this.params.ids);

            await Promise.all([
                this.core.db.studentProfile.deleteByIds(this.params.ids),
                this.core.db.users.deleteByIds(userIds),
            ]);

            this.complete(true);
        } catch (err) {
            this.core.log.error('StudentDelete error', err);
            this.complete(null, err, 'StudentDelete error');
        }
    }
}

module.exports = StudentDeleteRoute;