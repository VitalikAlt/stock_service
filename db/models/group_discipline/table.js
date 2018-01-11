const mongoose = require('mongoose');

const groupDiscipline = mongoose.Schema;

const GroupDiscipline = new groupDiscipline({
    discipline_id: { type: String, required: true },
    group_id: { type: String, required: true }
});

const GroupDisciplineModel = mongoose.model('GroupDiscipline', GroupDiscipline);

module.exports = GroupDisciplineModel;