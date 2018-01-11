const BaseRoute = require(appRoot + '/routing/BaseRoute');

class UserGetRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return [];
    }

    async handle() {
        try {
            let userId;

            if (this.params.student_id)
                userId = (await this.core.db.studentProfile.get({_id: this.params.student_id}))[0].user_id;

            if (this.params.teacher_id)
                userId = (await this.core.db.teacherProfile.get({_id: this.params.teacher_id}))[0].user_id;

            const user = await this.core.db.users.getById(userId);

            if (!user)
                return this.complete(null, 'Error: incorrect data', 'No user with that id!');

            this.complete({id: user._id, login: user.login});
        } catch (err) {
            this.core.log.error('UserGet error', err);
            this.complete(null, err, 'UserGet error');
        }
    }
}

module.exports = UserGetRoute;