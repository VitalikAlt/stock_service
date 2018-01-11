const mongoose = require('mongoose');

const studentProfile = mongoose.Schema;

const StudentProfile = new studentProfile({
    user_id: { type: String, required: true },
    group_id: { type: String, required: true},

    name: { type: String, required: false},
    surname: { type: String, required: false},
    father_name: { type: String, required: false},

    birth_place: { type: String, required: false},
    birth_date: { type: Date, required: false},
    residence_address: { type: String, required: false},

    education: { type: String, required: false},
    faculty: { type: String, required: false},
    start_study_year: { type: String, required: false},
    public_work: { type: String, required: false},

    family_status: { type: String, required: false},
    father_data: { type: String, required: false},
    father_residence: { type: String, required: false},
    mother_data: { type: String, required: false},
    mother_residence: { type: String, required: false},


    student_card_number: { type: String, required: false},
    cumulative_number: { type: String, required: false},
    military_number: { type: String, required: false},
    passport_series: { type: String, required: false},
    passport_number: { type: String, required: false},

    military_data: { type: String, required: false},
    contract_data: { type: String, required: false},
    conclusion: { type: String, required: false}
});

const StudentProfileModel = mongoose.model('StudentProfile', StudentProfile);

module.exports = StudentProfileModel;