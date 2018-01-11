const mongoose = require('mongoose');

const teacherProfile = mongoose.Schema;

const TeacherProfile = new teacherProfile({
    user_id: { type: String, required: true },

    name: { type: String, required: true},
    surname: { type: String, required: true},
    father_name: { type: String, required: true},

    birth_place: { type: String, required: false},
    birth_date: { type: Date, required: false},
    residence_address: { type: String, required: false},

    work_position: { type: String, required: false},
    military_rank: { type: String, required: false},

    education: { type: String, required: false},
    work_start_year: { type: String, required: false},

    passport_series: { type: String, required: false},
    passport_number: { type: String, required: false},
    military_number: { type: String, required: false},
});

const TeacherProfileModel = mongoose.model('TeacherProfile', TeacherProfile);

module.exports = TeacherProfileModel;