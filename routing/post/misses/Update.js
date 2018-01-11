const BaseRoute = require(appRoot + '/routing/BaseRoute');

class MissesUpdateRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['student_id', 'date', 'lesson_number', 'reason'];
    }

    get roles() {
        return ['admin', 'teacher']
    }

    async handle() {
        try {
            console.log(this.params);
            console.log(this.cellData)

            if (this.params.id)
                await this.core.db.studentMisses.update(this.cellData, {_id: this.params.id});
            else
                await this.core.db.studentMisses.add(this.cellData);

            this.complete(true);
        } catch (err) {
            this.core.log.error('MissesUpdateRoute error', err);
            this.complete(null, err, 'MissesUpdateRoute error');
        }
    }

    get cellData() {
        return {
            student_id: this.params.student_id,
            date: this.params.date,
            lesson_number: this.params.lesson_number,
            reason: this.params.reason
        }
    }
}

module.exports = MissesUpdateRoute;