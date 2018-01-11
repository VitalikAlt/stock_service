const BaseRoute = require(appRoot + '/routing/BaseRoute');

class MarkGetStudentRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['student_id'];
    }

    async handle() {
        try {
            let average = 0;
            const markList = {};
            const marks = await this.core.db.termMarks.getByStudentId(this.params.student_id);

            for (let i = 0; i < marks.length; i++) {
                average += marks[i].mark;

                markList[marks[i].discipline_id] = markList[marks[i].discipline_id] || {
                    marks: this.core.cfg.shared.common_student_term_marks.slice()
                };

                markList[marks[i].discipline_id].marks[marks[i].term - 1] = marks[i].mark;
            }

            const disciplineIds = Object.keys(markList);
            const disciplineNames = await this.core.db.discipline.getNames(disciplineIds);

            for (let i = 0; i < disciplineIds.length; i++) {
                markList[disciplineIds[i]].name = disciplineNames[i];
            }

            markList.average = (average / marks.length).toFixed(2);
            markList.misses = (await this.core.db.studentMisses.get({student_id: this.params.student_id})).length;
            this.complete(markList);
        } catch (err) {
            this.core.log.error('MarkGetStudentRoute error', err);
            this.complete(null, err, 'MarkGetStudentRoute error');
        }
    }
}

module.exports = MarkGetStudentRoute;
