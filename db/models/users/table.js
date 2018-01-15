const mongoose = require('mongoose');

const users = mongoose.Schema;

// booker - бухгалтер (админ
// deputy - заместитель
// manager - мэненджер
// seamstress - швея
// storekeeper - кладовщик

const Users = new users({
    login: {type: String, required: false},
    password: {type: String, required: false},
    role: {type: String, required: false},
    name: {type: String, required: false}
});

const UsersModel = mongoose.model('Users', Users);

module.exports = UsersModel;