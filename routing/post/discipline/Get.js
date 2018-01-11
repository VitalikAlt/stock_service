const BaseRoute = require(appRoot + '/routing/BaseRoute');

class DisciplineGetRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['teacher_id'];
    }

    get roles() {
        return ['admin', 'teacher']
    }

    async handle() {
        try {
            const disciplineList = [];
            const disciplines = await this.core.db.discipline.get({teacher_id: this.params.teacher_id});

            for (let i = 0; i < disciplines.length; i++) {
                disciplineList.push({
                    id: disciplines[i]._id,
                    name:disciplines[i].name
                })
            }

            this.complete(disciplineList);
        } catch (err) {
            this.core.log.error('DisciplineGetRoute error', err);
            this.complete(null, err, 'DisciplineGetRoute error');
        }
    }
}

module.exports = DisciplineGetRoute;