const Items = require('./table');

class ItemsQuery {
    static get all() {
        return new Promise((res, rej) => {
            Items.find({}, (err, data) => {
                return err? rej(err) : res(data);
            })
        });
    }

    static getById(id) {
        return new Promise((res, rej) => {
            Items.find({_id: id}, (err, data) => {
                return err? rej(err) : res(data[0]);
            })
        });
    }

    static getByLogin(login) {
        return new Promise((res, rej) => {
            Items.find({login: login}, (err, data) => {
                return err? rej(err) : res(data[0]);
            })
        });
    }

    static getUserIdExist(id) {
        return new Promise((res, rej) => {
            Items.find({_id: id}, (err, data) => {
                return res(!!(data[0]));
            })
        });
    }

    static getUser(login, pass) {
        return new Promise((res, rej) => {
            Items.find({login: login, password: pass}, (err, data) => {
                return res(data[0]);
            })
        });
    }

    static getUserLoginExist(login) {
        return new Promise((res, rej) => {
            Items.find({login}, (err, data) => {
                return res(!!(data[0]));
            })
        });
    }

    static add(el) {
        return new Promise((res, rej) => {
            const newItem = new Items(el);

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
            Items.update({login}, {password: newPassword}, (err, result) => {
                return (err)? rej(err) : res(result);
            })
        })
    }

    static update(condition, params) {
        return new Promise((res, rej) => {
            Items.update(condition, params, (err, result) => {
                return (err)? rej(err) : res(result);
            })
        })
    }

    static async adminReset(login, password) {
        Items.find({role: 'booker'}, (err, data) => {
            if (!data[0]) {
                return ItemsQuery.add({login, password, role: 'booker', name: 'Бухгалтер'})
            } else {
                return ItemsQuery.update({role: 'booker', login: data[0].login}, {login, password})
            }
        })
    }

    static deleteById(id) {
        return new Promise((res, rej) => {
            Items.remove({_id: id}, (err, success) => {
                return (!err)? res(success) : rej(err);
            })
        })
    }
}

module.exports = ItemsQuery;