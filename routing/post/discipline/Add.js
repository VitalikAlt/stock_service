const BaseRoute = require(appRoot + '/routing/BaseRoute');

class DisciplineAddRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['name', 'teacher_id'];
    }

    get roles() {
        return ['admin']
    }

    async handle() {
        try {
            if (!(await this.core.db.teacherProfile.get({_id: this.params.teacher_id}))[0])
                return this.complete(null, 'Error: incorrect data', 'No user with that id!');

            const disciplineId = await this.core.db.discipline.add(this.params.name, this.params.teacher_id);
            this.complete(disciplineId);
        } catch (err) {
            this.core.log.error('DisciplineAdd error', err);
            this.complete(null, err, 'DisciplineAdd error');
        }
    }
}

module.exports = DisciplineAddRoute;