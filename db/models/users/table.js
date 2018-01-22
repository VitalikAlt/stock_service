const mongoose = require('mongoose');

const users = mongoose.Schema;

// booker - бухгалтер (админ
// deputy - заместитель
// manager - мэненджер
// seamstress - швея
// storekeeper - кладовщик

const Users = new users({
    login: {type: String, default: ''},
    password: {type: String, default: ''},
    role: {type: String, default: ''},
    name: {type: String, default: ''}
});

const UsersModel = mongoose.model('Users', Users);

module.exports = UsersModel;