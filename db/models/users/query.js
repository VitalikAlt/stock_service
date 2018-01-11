const User = require('./table');

class UserQuery {
    static getById(id) {
        return new Promise((res, rej) => {
            User.find({_id: id}, (err, data) => {
                return err? rej(err) : res(data[0]);
            })
        });
    }

    static getByLogin(login) {
        return new Promise((res, rej) => {
            User.find({login: login}, (err, data) => {
                return err? rej(err) : res(data[0]);
            })
        });
    }

    static getUserIdExist(id) {
        return new Promise((res, rej) => {
            User.find({_id: id}, (err, data) => {
                return res(!!(data[0]));
            })
        });
    }

    static getUser(login, pass) {
        return new Promise((res, rej) => {
            User.find({login: login, password: pass}, (err, data) => {
                return res(data[0]);
            })
        });
    }

    static getUserLoginExist(login) {
        return new Promise((res, rej) => {
            User.find({login}, (err, data) => {
                return res(!!(data[0]));
            })
        });
    }

    static add(el) {
        return new Promise((res, rej) => {
            const newItem = new User(el);

            newItem.save(function (err) {
                if (!err) {
                    return res(newItem);
                } else {
                    return rej(err);
                }
            });
        });
    }

    static updatePassword(login, newPassword) {
        return new Promise((res, rej) => {
            User.update({login}, {password: newPassword}, (err, result) => {
                return (err)? rej(err) : res(result);
            })
        })
    }

    static async adminReset(login, password) {
        User.find({role: 'admin'}, (err, data) => {
            if (!data[0]) {
                return UserQuery.add({login, password, role: 'admin'})
            } else {
                return UserQuery.updatePassword(data[0].login, password)
            }
        })
    }

    static deleteByIds(ids) {
        return new Promise((res, rej) => {
            User.remove({_id: { $in: ids }}, (err, success) => {
                return (!err)? res(success) : rej(err);
            })
        })
    }
}

module.exports = UserQuery;