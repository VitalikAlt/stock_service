const BaseRoute = require(appRoot + '/routing/BaseRoute');

class StudentListRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return [];
    }

    get roles() {
        return ['admin']
    }

    async handle() {
        try {
            const studentList = [], userGroups = {}, groupQueries = [];
            const students = await this.core.db.studentProfile.get();

            for (let i = 0; i < students.length; i++) {
                userGroups[students[i].group_id] = userGroups[students[i].group_id] || [];
                userGroups[students[i].group_id].push(i);
                groupQueries.push(this.core.db.groups.get({_id: students[i].group_id}));

                studentList.push({
                    id: students[i]._id,
                    name: `${students[i].surname} ${students[i].name[0]}. ${students[i].father_name[0]}.`
                })
            }

            const groups = await Promise.all(groupQueries);

            for (let i = 0; i < groups.length; i++) {
                const userIndexes = userGroups[groups[i][0]._id];
                for (let j = 0; j < userIndexes.length; j++) {
                    studentList[userIndexes[j]].course = groups[i][0].course;
                    studentList[userIndexes[j]].squad = groups[i][0].squad;
                }
            }

            this.complete(studentList);
        } catch (err) {
            this.core.log.error('StudentList error', err);
            this.complete(null, err, 'StudentList error');
        }
    }
}

module.exports = StudentListRoute;