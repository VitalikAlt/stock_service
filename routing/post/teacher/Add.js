const BaseRoute = require(appRoot + '/routing/BaseRoute');

class TeacherAddRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['surname', 'name', 'father_name', 'login', 'password'];
    }

    get roles() {
        return ['admin']
    }

    async handle() {
        try {
            if (await this.core.db.users.getUserLoginExist(this.params.login))
                return this.complete(null, 'Error: incorrect data', 'User already exist!');

            const userId = (await this.core.db.users.add(Object.assign(this.params, {role: 'teacher'})))._id;

            const profileId = (await this.core.db.teacherProfile.add(Object.assign(this.params, {user_id: userId})))._id;
            this.complete(profileId);
        } catch (err) {
            this.core.log.error('TeacherAdd error', err);
            this.complete(null, err, 'TeacherAdd error');
        }
    }
}

module.exports = TeacherAddRoute;