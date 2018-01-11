const BaseRoute = require(appRoot + '/routing/BaseRoute');

class MarkGetRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['discipline_id', 'group_id'];
    }

    get roles() {
        return ['admin', 'teacher']
    }

    async handle() {
        try {
            const students = {}, studentIds = [];
            const studentList = await this.core.db.studentProfile.get({group_id: this.params.group_id});

            for (let i = 0; i < studentList.length; i++) {
                studentIds.push(studentList[i]._id);

                students[studentList[i]._id]= {
                    name: `${studentList[i].surname} ${studentList[i].name[0]}. ${studentList[i].father_name[0]}.`,
                    discipline_id: this.params.discipline_id,
                    marks: this.core.cfg.shared.common_term_marks.slice()
                }
            }

            const marks = await this.core.db.termMarks.get(this.params.discipline_id, studentIds);

            for (let i = 0; i < marks.length; i++) {
                students[marks[i].student_id].marks[marks[i].term - 1] = marks[i].mark;
            }

            this.complete(students);
        } catch (err) {
            this.core.log.error('MarkGetRoute error', err);
            this.complete(null, err, 'MarkGetRoute error');
        }
    }
}

module.exports = MarkGetRoute;