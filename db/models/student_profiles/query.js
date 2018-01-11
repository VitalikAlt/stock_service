const StudentProfile = require('./table');

class StudentProfileQuery {
    static get(params = {}) {
        return new Promise((res, rej) => {
            StudentProfile.find(params, {__v: false}, (err, data) => {
                return res(data);
            })
        });
    }

    static getUserIds(profileIds) {
        return new Promise((res, rej) => {
            StudentProfile.find({_id: { $in: profileIds }}, { user_id: true }, (err, data) => {
                const ids = [];

                for (let i = 0; i < data.length; i++) {
                    ids.push(data[i].user_id);
                }

                return res(ids);
            })
        })
    }

    static add(el) {
        return new Promise((res, rej) => {
            const newItem = new StudentProfile(el);

            newItem.save(function (err) {
                return (!err)? res(newItem) : rej(err);
            });
        });
    }

    static update(params, conditions) {
        return new Promise((res, rej) => {
            StudentProfile.update(conditions, params, function (err) {
                return (!err)? res(true) : rej(err);
            });
        });
    }

    static deleteByIds(ids) {
        return new Promise((res, rej) => {
            StudentProfile.remove({_id: { $in: ids }}, (err, success) => {
                return (!err)? res(success) : rej(err);
            })
        })
    }

    static delete(params = {}) {
        return new Promise((res, rej) => {
            StudentProfile.remove(params, (err, success) => {
                return (!err)? res(success) : rej(err);
            })
        })
    }
}

module.exports = StudentProfileQuery;