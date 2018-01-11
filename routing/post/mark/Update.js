const BaseRoute = require(appRoot + '/routing/BaseRoute');

class MarkUpdateRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['discipline_id', 'marks'];
    }

    get roles() {
        return ['teacher']
    }

    async handle() {
        try {
            const newMarks = this.params.marks, oldMarks = {}, sqlQueries = [];
            const marks = await this.core.db.termMarks.get(this.params.discipline_id, Object.keys(newMarks));

            for (let i = 0; i < marks.length; i++) {
                if (!oldMarks[marks[i].student_id])
                    oldMarks[marks[i].student_id] = this.core.cfg.shared.common_term_marks.slice();

                oldMarks[marks[i].student_id][marks[i].term - 1] = marks[i].mark;
            }

            for (const studentId in oldMarks) {
                sqlQueries.push(...this.getQueriesForEqual(newMarks[studentId].marks, oldMarks[studentId], studentId));
                delete oldMarks[studentId];
                delete newMarks[studentId];
            }

            for (const studentId in newMarks) {
                sqlQueries.push(...this.getAddQueriesForEqual(newMarks[studentId].marks, studentId));
            }

            await Promise.all(sqlQueries);
            this.complete(true);
        } catch (err) {
            this.core.log.error('MarkUpdateRoute error', err);
            this.complete(null, err, 'MarkUpdateRoute error');
        }
    }

    getQueriesForEqual(newMarks, oldMarks, studentId) {
        const sqlQueries = [];

        if (newMarks.length !== this.core.cfg.shared.common_term_marks.length)
            throw new Error('Marks count in config is not equal marks count in request!');

        for (let i = 0; i < newMarks.length; i++) {
            if (newMarks[i] === oldMarks[i])
                continue;

            if (newMarks[i] === null) {
                sqlQueries.push(this.core.db.termMarks.delete({term: i + 1, student_id: studentId}));
                continue;
            }

            if (oldMarks[i] === null) {
                sqlQueries.push(this.core.db.termMarks.add({student_id: studentId, discipline_id: this.params.discipline_id, term: i + 1, mark: newMarks[i]}));
                continue;
            }

            sqlQueries.push(this.core.db.termMarks.update({mark: newMarks[i]}, {term: i + 1, student_id: studentId}));
        }

        return sqlQueries;
    }

    getAddQueriesForEqual(newMarks, studentId) {
        const sqlQueries = [];

        if (newMarks.length !== this.core.cfg.shared.common_term_marks.length)
            throw new Error('Marks count in config is not equal marks count in request!');

        for (let i = 0; i < newMarks.length; i++) {
            if (newMarks[i] === null)
                continue;

            sqlQueries.push(this.core.db.termMarks.add({
                student_id: studentId,
                discipline_id: this.params.discipline_id,
                term: i + 1,
                mark: newMarks[i]
            }));
        }

        return sqlQueries;
    }
}

module.exports = MarkUpdateRoute;