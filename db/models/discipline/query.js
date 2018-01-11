const Group = require('./table');

class GroupQuery {
    static get(params = {}) {
        return new Promise((res, rej) => {
            Group.find(params, {_v: false}, (err, data) => {
                return err? rej(err) : res(data);
            })
        });
    }

    static getNames(disciplineIds) {
        return new Promise((res, rej) => {
            Group.find({_id: { $in: disciplineIds }}, (err, data) => {
                const names = [];

                for (let i = 0; i < data.length; i++) {
                    names.push(data[i].name);
                }

                return res(names);
            })
        })
    }

    static add(name, teacher_id) {
        return new Promise((res, rej) => {
            const newItem = new Group({name, teacher_id});

            newItem.save(function (err) {
                return (!err)? res(newItem._id) : rej(err);
            });
        });
    }

    static update(params, conditions) {
        return new Promise((res, rej) => {
            Group.update(conditions, params, function (err) {
                return (!err)? res(true) : rej(err);
            });
        });
    }

    static delete(params) {
        return new Promise((res, rej) => {
            Group.remove(params, (err, success) => {
                return (!err)? res(success) : rej(err);
            })
        })
    }
}

module.exports = GroupQuery;