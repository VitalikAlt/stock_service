const BaseRoute = require(appRoot + '/routing/BaseRoute');

class TeacherUpdateRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['id', 'data'];
    }

    get roles() {
        return ['admin']
    }

    async handle() {
        try {
            if (!(await this.core.db.teacherProfile.get({_id: this.params.id}))[0])
                return this.complete(null, 'Error: incorrect data', 'No user with that id!');

            const result = await this.core.db.teacherProfile.update(this.params.data, {_id: this.params.id});
            this.complete(result);
        } catch (err) {
            this.core.log.error('TeacherAdd error', err);
            this.complete(null, err, 'TeacherAdd error');
        }
    }
}

module.exports = TeacherUpdateRoute;