const BaseRoute = require(appRoot + '/routing/BaseRoute');

class StudentGetProfileRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['id'];
    }

    async handle() {
        try {
            const studentProfile = (await this.core.db.studentProfile.get({_id: this.params.id}))[0];

            if (!studentProfile)
                return this.complete(null, 'Error: incorrect data', 'No user with that id!');

            delete studentProfile._doc._id;
            delete studentProfile._doc.user_id;
            if (studentProfile._doc.birth_date)
                studentProfile._doc.birth_date =
                    `${studentProfile._doc.birth_date.getDate()}/${studentProfile._doc.birth_date.getMonth() + 1}/${studentProfile._doc.birth_date.getFullYear()}`;

            const group = await this.core.db.groups.get({_id: studentProfile.group_id});
            studentProfile._doc.course = group[0].course;
            studentProfile._doc.squad = group[0].squad;

            this.complete(studentProfile);
        } catch (err) {
            this.core.log.error('StudentGetProfile error', err);
            this.complete(null, err, 'StudentGetProfile error');
        }
    }
}

module.exports = StudentGetProfileRoute;