const BaseRoute = require(appRoot + '/routing/BaseRoute');

class StudentAddRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['course', 'squad', 'surname', 'name', 'father_name', 'login', 'password'];
    }

    get roles() {
        return ['admin']
    }

    async handle() {
        try {
            if (await this.core.db.users.getUserLoginExist(this.params.login))
                return this.complete(null, 'Error: incorrect data', 'User already exist!');

            if (typeof this.params.course !== 'number' || typeof this.params.squad !== 'number')
                return this.complete(null, 'Error: incorrect data', 'Bad course or password!');

            const userId = (await this.core.db.users.add(Object.assign(this.params, {role: 'student'})))._id;

            let groupId = await this.core.db.groups.getId(this.params.course, this.params.squad);
            groupId = groupId || (await this.core.db.groups.add(this.params.course, this.params.squad));

            const studentId = (await this.core.db.studentProfile.add(Object.assign(this.params, {group_id: groupId, user_id: userId})))._id;
            this.complete(studentId);
        } catch (err) {
            this.core.log.error('StudentAdd error', err);
            this.complete(null, err, 'StudentAdd error');
        }
    }
}

module.exports = StudentAddRoute;