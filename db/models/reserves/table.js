const mongoose = require('mongoose');

const Reserves = mongoose.Schema;

//TODO: add client field
const reserves = new Reserves({
    item_id: {type: String, required: true},
    user_id: {type: String, required: true},
    name: {type: String, default: ''},
    count: {type: String, default: ''},
    growth: {type: String, default: ''},
    size: {type: String, default: ''},
    payment: {type: Boolean, default: false},
    client: {type: String, default: ''},
    workshop: {type: String, default: ''},
    created_at: {type: Date, default: new Date()},
    due_date: {type: Date, default: null},
    create_date: {type: Date, default: null},
    payment_number: {type: String, default: ''}
});

const reservesModel = mongoose.model('reserves', reserves);

module.exports = reservesModel;