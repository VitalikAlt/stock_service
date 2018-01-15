const mongoose = require('mongoose');
const users = require('./models/users/query');

mongoose.Promise = global.Promise;

//TODO переименовать все базы данных к виду abc_abc вместо камелКейса
class Db {
    static connect(url) {
        mongoose.connect(url, { useMongoClient: true });
    }

    static get users() {
        return users;
    }
}

module.exports = Db;