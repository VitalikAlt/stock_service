const BaseRoute = require(appRoot + '/routing/BaseRoute');

class MissesGetByDateRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['date', 'group_id'];
    }

    get roles() {
        return ['admin', 'teacher']
    }

    async handle() {
        try {
            let missesList = [];
            const students = {};
            const studentList = await this.core.db.studentProfile.get({group_id: this.params.group_id});

            for (let i = 0; i < studentList.length; i++) {
                missesList.push(this.core.db.studentMisses.get({student_id: studentList[i]._id, date: this.params.date}));

                students[studentList[i]._id] = {};
                students[studentList[i]._id].name = `${studentList[i].surname} ${studentList[i].name[0]}. ${studentList[i].father_name[0]}.`;
                students[studentList[i]._id].misses = students[studentList[i]._id].misses || this.core.cfg.shared.common_misses.slice();
            }

            missesList = await Promise.all(missesList);

            for (let i = 0; i < missesList.length; i++) {
                for(let j = 0; j < missesList[i].length; j++) {
                    students[studentList[i]._id].misses[missesList[i][j].lesson_number] = {
                        id: missesList[i][j]._id,
                        lesson_number: missesList[i][j].lesson_number,
                        reason: missesList[i][j].reason
                    };
                }
            }

            this.complete(students);
        } catch (err) {
            this.core.log.error('MissesGetByDateRoute error', err);
            this.complete(null, err, 'MissesGetByDateRoute error');
        }
    }
}

module.exports = MissesGetByDateRoute;