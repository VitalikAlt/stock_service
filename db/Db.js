const mongoose = require('mongoose');
const users = require('./models/users/query');
const groups = require('./models/groups/query');
const studentProfile = require('./models/student_profiles/query');
const teacherProfile = require('./models/teacher_profiles/query');
const discipline = require('./models/discipline/query');
const groupDiscipline = require('./models/group_discipline/query');
const termMarks = require('./models/term_marks/query');
const scheduleCell = require('./models/schedule_cell/query');
const studentMisses = require('./models/student_misses/query');

mongoose.Promise = global.Promise;

//TODO переименовать все базы данных к виду abc_abc вместо камелКейса
class Db {
    static connect(url) {
        mongoose.connect(url, { useMongoClient: true });
    }

    static get users() {
        return users;
    }

    static get groups() {
        return groups;
    }

    static get studentProfile() {
        return studentProfile;
    }

    static get teacherProfile() {
        return teacherProfile;
    }

    static get discipline() {
        return discipline;
    }

    static get groupDiscipline() {
        return groupDiscipline;
    }

    static get termMarks() {
        return termMarks;
    }

    static get scheduleCell() {
        return scheduleCell;
    }

    static get studentMisses() {
        return studentMisses;
    }
}

module.exports = Db;