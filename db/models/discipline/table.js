const mongoose = require('mongoose');

const discipline = mongoose.Schema;

const Discipline = new discipline({
    name: { type: String, required: true },
    teacher_id: { type: String, required: true }
});

const DisciplineModel = mongoose.model('Discipline', Discipline);

module.exports = DisciplineModel;