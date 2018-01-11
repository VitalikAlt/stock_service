const BaseRoute = require(appRoot + '/routing/BaseRoute');

class ScheduleDeleteRoute extends BaseRoute {
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
            await this.core.db.scheduleCell.deleteByIds(this.params.ids);
            this.complete(true);
        } catch (err) {
            this.core.log.error('ScheduleDeleteRoute error', err);
            this.complete(null, err, 'ScheduleDeleteRoute error');
        }
    }
}

module.exports = ScheduleDeleteRoute;