const mongoose = require('mongoose');

const users = mongoose.Schema;

// booker - бухгалтер (админ
// deputy - заместитель
// manager - мэненджер
// seamstress - швея
// storekeeper - кладовщик

const Users = new users({
    login: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
    name: {type: String, required: true}
});

const UsersModel = mongoose.model('Users', Users);

module.exports = UsersModel;