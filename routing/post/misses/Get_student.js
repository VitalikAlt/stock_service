const BaseRoute = require(appRoot + '/routing/BaseRoute');

class MissesGetStudentRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['student_id', 'sender'];
    }

    async handle() {
        try {
            if (!(await this.checkSender()))
                return this.complete(null, 'Error: no permission', 'No permission for this action!');

            const missesList = await this.core.db.studentMisses.get({student_id: this.params.student_id});
            this.complete(missesList);
        } catch (err) {
            this.core.log.error('MissesGetStudentRoute error', err);
            this.complete(null, err, 'MissesGetStudentRoute error');
        }
    }

    async checkSender() {
        if (!this.params.sender.login || !this.params.sender.password)
            return false;

        const user = await this.core.db.users.getUser(this.params.sender.login, this.params.sender.password);

        if (!user)
            return false;

        const profile = await this.core.db.studentProfile.get({user_id: user._id});
        return !(!profile[0] || profile[0]._id != this.params.student_id)
    }
}

module.exports = MissesGetStudentRoute;