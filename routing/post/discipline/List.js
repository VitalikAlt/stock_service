const BaseRoute = require(appRoot + '/routing/BaseRoute');

class DisciplineListRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return [];
    }


    get roles() {
        return ['admin']
    }

    async handle() {
        try {
            let teachers = [];
            const disciplineList = [];

            const disciplines = await this.core.db.discipline.get();

            for (let i = 0; i < disciplines.length; i++) {
                teachers.push(
                    await this.core.db.teacherProfile.get({_id: disciplines[i].teacher_id})
                );
            }

            teachers = await Promise.all(teachers);

            for (let i = 0; i < disciplines.length; i++) {
                if (!teachers[i][0])
                    continue;

                disciplineList.push({
                    id: disciplines[i].id,
                    name: disciplines[i].name,
                    teacher: `${teachers[i][0].surname} ${teachers[i][0].name[0]}. ${teachers[i][0].father_name[0]}.`
                })
            }

            this.complete(disciplineList);
        } catch (err) {
            this.core.log.error('DisciplineList error', err);
            this.complete(null, err, 'DisciplineList error');
        }
    }
}

module.exports = DisciplineListRoute;