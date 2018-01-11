const BaseRoute = require(appRoot + '/routing/BaseRoute');

class TeacherListRoute extends BaseRoute {
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
            const teacherList = [];

            const teachers = await this.core.db.teacherProfile.get();

            for (let i = 0; i < teachers.length; i++) {
                teacherList.push({
                    id: teachers[i]._id,
                    name: `${teachers[i].surname} ${teachers[i].name[0]}. ${teachers[i].father_name[0]}.`
                })
            }

            this.complete(teacherList);
        } catch (err) {
            this.core.log.error('TeacherList error', err);
            this.complete(null, err, 'TeacherList error');
        }
    }
}

module.exports = TeacherListRoute;