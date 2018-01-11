const mongoose = require('mongoose');

const studentMisses = mongoose.Schema;

const StudentMisses = new studentMisses({
    student_id: { type: String, required: true },
    lesson_number: { type: Number, required: true, min: 1, max: 5 },
    date: { type: Date, required: true},
    reason: { type: String, required: true }
});

const StudentMissesModel = mongoose.model('StudentMisses', StudentMisses);

module.exports = StudentMissesModel;