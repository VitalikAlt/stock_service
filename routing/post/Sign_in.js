const BaseRoute = require(appRoot + '/routing/BaseRoute');

class SignInRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['login', 'password'];
    }

    async handle() {
        try {
            const user = await this.core.db.users.getUser(this.params.login, this.params.password);

            if (!user)
                return this.complete(null, 'Error: incorrect data', 'Incorrect login or password!');

            if (user.role === 'admin')
                return this.complete({role: user.role});

            const profileId = await this.getProfileId(user);

            this.complete({role: user.role, profile_id: profileId});
        } catch (err) {
            this.complete(null, err, 'SignIn error');
        }
    }

    async getProfileId(user) {
        if (user.role === 'student')
            return (await this.core.db.studentProfile.get({user_id: user._id}))[0]._id;

        if (user.role === 'teacher')
            return (await this.core.db.teacherProfile.get({user_id: user._id}))[0]._id;

        return undefined;
    }
}

module.exports = SignInRoute;