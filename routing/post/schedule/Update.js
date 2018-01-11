const BaseRoute = require(appRoot + '/routing/BaseRoute');

class ScheduleUpdateRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['group_id', 'teacher_id', 'discipline_id', 'room', 'week_number', 'lesson_number', 'day_number'];
    }

    get roles() {
        return ['admin']
    }

    async handle() {
        try {
            if (this.params.id)
                await this.core.db.scheduleCell.update(this.cellData, {id: this.params.id});
            else
                await this.core.db.scheduleCell.add(this.cellData);

            this.complete(true);
        } catch (err) {
            this.core.log.error('ScheduleUpdateRoute error', err);
            this.complete(null, err, 'ScheduleUpdateRoute error');
        }
    }

    get cellData() {
        return {
            group_id: this.params.group_id,
            discipline_id: this.params.discipline_id,
            teacher_id: this.params.teacher_id,
            room: this.params.room,
            lesson_number: this.params.lesson_number,
            week_number: this.params.week_number,
            day_number: this.params.day_number
        }
    }
}

module.exports = ScheduleUpdateRoute;