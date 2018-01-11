const BaseRoute = require(appRoot + '/routing/BaseRoute');

/*
{
    week1: {
        lesson1: {
            day1: cell,
            day2: cell
        }
    }
}
 */

class ScheduleGetRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['group_id'];
    }

    async handle() {
        try {
            const scheduleList = {};

            const schedule = await this.core.db.scheduleCell.get({group_id: this.params.group_id});
            const [teacherNames, disciplineNames] = await this.getTeacherAndDisciplineNames(schedule);

            for (let i = 0; i < schedule.length; i++) {
                const cell = schedule[i];

                if (!scheduleList[cell.week_number])
                    scheduleList[cell.week_number] = {};

                const currentElement = scheduleList[cell.week_number];

                if (!currentElement[cell.lesson_number])
                    currentElement[cell.lesson_number] = {};

                currentElement[cell.lesson_number][cell.day_number] = {
                    id: cell._id,
                    room: cell.room,
                    teacher_name: teacherNames[cell.teacher_id],
                    discipline_name: disciplineNames[cell.discipline_id]
                };
            }

            this.complete(scheduleList);
        } catch (err) {
            this.core.log.error('GroupGet error', err);
            this.complete(null, err, 'GroupGet error');
        }
    }

    //TODO переделать indexOf на map или set
    async getTeacherAndDisciplineNames(schedule) {
        const teacherIds = [], teacherNamesById = {};
        const disciplineIds = [], disciplineNamesById = {};

        for (let i = 0; i < schedule.length; i++) {
            if (teacherIds.indexOf(schedule[i].teacher_id) === -1)
                teacherIds.push(schedule[i].teacher_id);

            if (disciplineIds.indexOf(schedule[i].discipline_id) === -1)
                disciplineIds.push(schedule[i].discipline_id)
        }

        const [teacherNames, disciplineNames] = await Promise.all([
            await this.core.db.teacherProfile.getNames(teacherIds),
            await this.core.db.discipline.getNames(disciplineIds)
        ]);

        for (let i = 0; i < teacherIds.length; i++) {
            teacherNamesById[teacherIds[i]] = teacherNames[i];
            disciplineNamesById[disciplineIds[i]] = disciplineNames[i];
        }

        return [teacherNamesById, disciplineNamesById];
    }
}

module.exports = ScheduleGetRoute;