const mongoose = require('mongoose');

const groups = mongoose.Schema;

const Groups = new groups({
    course: {
        type: Number,
        required: true,
        min: 0,
        max: 6
    },

    squad: {
        type: Number,
        required: true,
        min: 0,
        max: 15
    }
});

const GroupsModel = mongoose.model('Groups', Groups);

module.exports = GroupsModel;