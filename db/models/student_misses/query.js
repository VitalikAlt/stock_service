const StudentMisses = require('./table');

class StudentMissesQuery {
    static get(params = {}) {
        return new Promise((res, rej) => {
            StudentMisses.find(params, {_v: false}, (err, data) => {
                return err? rej(err) : res(data);
            })
        });
    }

    static getNames(disciplineIds) {
        return new Promise((res, rej) => {
            StudentMisses.find({_id: { $in: disciplineIds }}, (err, data) => {
                const names = [];

                for (let i = 0; i < data.length; i++) {
                    names.push(data[i].name);
                }

                return res(names);
            })
        })
    }

    static add(params) {
        return new Promise((res, rej) => {
            const newItem = new StudentMisses(params);

            newItem.save(function (err) {
                return (!err)? res(newItem._id) : rej(err);
            });
        });
    }

    static update(params, conditions) {
        return new Promise((res, rej) => {
            StudentMisses.update(conditions, params, function (err) {
                return (!err)? res(true) : rej(err);
            });
        });
    }

    static deleteById(id) {
        return new Promise((res, rej) => {
            StudentMisses.remove({_id: id}, (err, success) => {
                return (!err)? res(success) : rej(err);
            })
        })
    }
}

module.exports = StudentMissesQuery;