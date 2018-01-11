const BaseRoute = require(appRoot + '/routing/BaseRoute');

class MissesDeleteRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['id'];
    }

    get roles() {
        return ['admin', 'teacher']
    }

    async handle() {
        try {
            await this.core.db.studentMisses.deleteById(this.params.id);
            this.complete(true);
        } catch (err) {
            this.core.log.error('MissesDeleteRoute error', err);
            this.complete(null, err, 'MissesDeleteRoute error');
        }
    }
}

module.exports = MissesDeleteRoute;