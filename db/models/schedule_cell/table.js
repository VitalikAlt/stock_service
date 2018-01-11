const mongoose = require('mongoose');

const scheduleCell = mongoose.Schema;

const ScheduleCell = new scheduleCell({
    group_id: { type: String, required: true },
    teacher_id: { type: String, required: true },
    discipline_id: { type: String, required: true },
    room: { type: String, required: true },
    day_number: { type: Number, required: true, min: 1, max: 5 },
    lesson_number: { type: Number, required: true, min: 1, max: 4 },
    week_number: { type: Number, required: true, min: 1, max: 2 }
});

const ScheduleCellModel = mongoose.model('ScheduleCell', ScheduleCell);

module.exports = ScheduleCellModel;