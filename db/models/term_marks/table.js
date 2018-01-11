//TODO: написать до какого семестра
const mongoose = require('mongoose');

const termMarks = mongoose.Schema;

const TermMarks = new termMarks({
    student_id: { type: String, required: true },
    discipline_id: { type: String, required: true },
    term: { type: Number, required: true, min: 1, max: 50 },
    mark: { type: Number, required: true, min: 0, max: 5 }
});

const TermMarksModel = mongoose.model('TermMarks', TermMarks);

module.exports = TermMarksModel;