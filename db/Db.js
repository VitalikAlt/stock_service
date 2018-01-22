const mongoose = require('mongoose');
const users = require('./models/users/query');
const items = require('./models/items/query');
const reserves = require('./models/reserves/query');
const workshopReserves = require('./models/workshop_reserves/query');

mongoose.Promise = global.Promise;

//TODO переименовать все базы данных к виду abc_abc вместо камелКейса
class Db {
    static connect(url) {
        mongoose.connect(url, { useMongoClient: true });
    }

    static get users() {
        return users;
    }

    static get items() {
        return items;
    }

    static get reserves() {
        return reserves;
    }

    static get workshopReserves() {
        return workshopReserves;
    }
}

module.exports = Db;