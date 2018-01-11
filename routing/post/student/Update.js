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
            if (!(await this.core.db.studentProfile.get({_id: this.params.id}))[0])
                return this.complete(null, 'Error: incorrect data', 'No user with that id!');

            this.params.data.group_id = await this.core.db.groups.getId(this.params.data.course, this.params.data.squad);

            if (!this.params.data.group_id)
                return this.complete(null, 'Error: incorrect data', 'No group_id for that course and squad!');

            const result = await this.core.db.studentProfile.update(this.params.data, {_id: this.params.id});
            this.complete(result);
        } catch (err) {
            this.core.log.error('TeacherUpdate error', err);
            this.complete(null, err, 'TeacherUpdate error');
        }
    }
}

module.exports = TeacherUpdateRoute;