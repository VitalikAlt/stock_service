const mongoose = require('mongoose');

const items = mongoose.Schema;

const Items = new items({
    name: {type: String, default: ""},
    count: {type: String, default: ""},
    size: {type: String, default: ""},
    growth: {type: String, default: ""}
});

const ItemsModel = mongoose.model('Items', Items);

module.exports = ItemsModel;