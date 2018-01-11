const BaseRoute = require(appRoot + '/routing/BaseRoute');

//TODO разгроничить поля, которые отдаются админу и преподавателю
class TeacherGetProfileRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['id'];
    }

    async handle() {
        try {
            const teacherProfile = (await this.core.db.teacherProfile.get({_id: this.params.id}))[0];

            if (!teacherProfile)
                return this.complete(null, 'Error: incorrect data', 'No user with that id!');

            teacherProfile._doc.id = teacherProfile._doc._id;
            delete teacherProfile._doc._id;
            delete teacherProfile._doc.user_id;
            teacherProfile._doc.birth_date = !teacherProfile._doc.birth_date? null :
                `${teacherProfile._doc.birth_date.getDate()}/${teacherProfile._doc.birth_date.getMonth() + 1}/${teacherProfile._doc.birth_date.getFullYear()}`;

            this.complete(teacherProfile);
        } catch (err) {
            this.core.log.error('TeacherGetProfile error', err);
            this.complete(null, err, 'TeacherGetProfile error');
        }
    }
}

module.exports = TeacherGetProfileRoute;