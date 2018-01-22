const reserves = require('./table');

class ReservesQuery {
    static get all() {
        return new Promise((res, rej) => {
            reserves.find({}, (err, data) => {
                return err? rej(err) : res(data);
            })
        });
    }

    static getByItemId(item_id) {
        return new Promise((res, rej) => {
            reserves.find({item_id}, (err, data) => {
                return err? rej(err) : res(data);
            })
        });
    }

    static getFuturePaid() {
        return new Promise((res, rej) => {
            reserves.find({payment: true, due_date: {"$gte": new Date()}}, (err, data) => {
                return err? rej(err) : res(data);
            })
        });
    }

    static getCountByItemId(item_id) {
        return new Promise((res, rej) => {
            reserves.find({item_id}, (err, data) => {
                if (err)
                    return rej(err);

                if (!data.length)
                    return res(0);

                let count = 0;
                for (let i = 0; i < data.length; i++) {
                    count += Number(data[i].count);
                }

                res(count);
            })
        })
    }

    static getById(id) {
        return new Promise((res, rej) => {
            reserves.find({_id: id}, (err, data) => {
                return err? rej(err) : res(data[0]);
            })
        });
    }

    static getByLogin(login) {
        return new Promise((res, rej) => {
            reserves.find({login: login}, (err, data) => {
                return err? rej(err) : res(data[0]);
            })
        });
    }

    static getUserIdExist(id) {
        return new Promise((res, rej) => {
            reserves.find({_id: id}, (err, data) => {
                return res(!!(data[0]));
            })
        });
    }

    static getUser(login, pass) {
        return new Promise((res, rej) => {
            reserves.find({login: login, password: pass}, (err, data) => {
                return res(data[0]);
            })
        });
    }

    static getUserLoginExist(login) {
        return new Promise((res, rej) => {
            reserves.find({login}, (err, data) => {
                return res(!!(data[0]));
            })
        });
    }

    static add(el) {
        return new Promise((res, rej) => {
            const newItem = new reserves(el);

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
            reserves.update({login}, {password: newPassword}, (err, result) => {
                return (err)? rej(err) : res(result);
            })
        })
    }

    static update(condition, params) {
        return new Promise((res, rej) => {
            reserves.update(condition, params, (err, result) => {
                return (err)? rej(err) : res(result);
            })
        })
    }

    static deleteById(id) {
        return new Promise((res, rej) => {
            reserves.remove({_id: id}, (err, success) => {
                return (!err)? res(success) : rej(err);
            })
        })
    }
}

module.exports = ReservesQuery;