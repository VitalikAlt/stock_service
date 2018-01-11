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
        return ['teacher_id'];
    }

    get roles() {
        return ['teacher']
    }

    async handle() {
        try {
            const scheduleList = {};

            const schedule = await this.core.db.scheduleCell.get({teacher_id: this.params.teacher_id});
            const [groupNames, disciplineNames] = await this.getGroupAndDisciplineNames(schedule);

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
                    group_name: groupNames[cell.group_id],
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
    async getGroupAndDisciplineNames(schedule) {
        const groupIds = [], groupNamesById = {};
        const disciplineIds = [], disciplineNamesById = {};

        for (let i = 0; i < schedule.length; i++) {
            if (groupIds.indexOf(schedule[i].group_id) === -1)
                groupIds.push(schedule[i].group_id);

            if (disciplineIds.indexOf(schedule[i].discipline_id) === -1)
                disciplineIds.push(schedule[i].discipline_id)
        }

        const [groupNames, disciplineNames] = await Promise.all([
            await this.core.db.groups.getNames(groupIds),
            await this.core.db.discipline.getNames(disciplineIds)
        ]);

        console.log(groupNames, disciplineNames);

        for (let i = 0; i < groupIds.length; i++) {
            groupNamesById[groupIds[i]] = groupNames[i];
            disciplineNamesById[disciplineIds[i]] = disciplineNames[i];
        }

        return [groupNamesById, disciplineNamesById];
    }
}

module.exports = ScheduleGetRoute;