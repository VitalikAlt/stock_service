const mongoose = require('mongoose');

const WorkshopReserves = mongoose.Schema;

const workshopReserves = new WorkshopReserves({
    item_id: {type: String, required: true},
    user_id: {type: String, required: true},
    name: {type: String, default: ''},
    count: {type: String, default: ''},
    growth: {type: String, default: ''},
    size: {type: String, default: ''},
    created_at: {type: Date, default: new Date()},
});

const workshopReservesModel = mongoose.model('workshop_reserves', workshopReserves);

module.exports = workshopReservesModel;