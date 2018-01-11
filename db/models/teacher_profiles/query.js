const TeacherProfile = require('./table');

class TeacherProfileQuery {
    static get(params = {}) {
        return new Promise((res, rej) => {
            TeacherProfile.find(params, {__v: false},  (err, data) => {
                return res(data);
            })
        });
    }

    static getUserIds(profileIds) {
        return new Promise((res, rej) => {
            TeacherProfile.find({_id: { $in: profileIds }}, { user_id: true }, (err, data) => {
                const ids = [];

                for (let i = 0; i < data.length; i++) {
                    ids.push(data[i].user_id);
                }

                return res(ids);
            })
        })
    }

    static getNames(profileIds) {
        return new Promise((res, rej) => {
            TeacherProfile.find({_id: { $in: profileIds }}, (err, teachers) => {
                const names = [];

                for (let i = 0; i < teachers.length; i++) {
                    names.push(`${teachers[i].surname} ${teachers[i].name[0]}. ${teachers[i].father_name[0]}.`);
                }

                return res(names);
            })
        })
    }

    static add(el) {
        return new Promise((res, rej) => {
            const newItem = new TeacherProfile(el);

            newItem.save(function (err) {
                return (!err)? res(newItem) : rej(err);
            });
        });
    }

    static update(params, conditions) {
        return new Promise((res, rej) => {
            TeacherProfile.update(conditions, params, function (err) {
                return (!err)? res(true) : rej(err);
            });
        });
    }

    static deleteByIds(ids) {
        return new Promise((res, rej) => {
            TeacherProfile.remove({_id: { $in: ids }}, (err, success) => {
                return (!err)? res(success) : rej(err);
            })
        })
    }
}

module.exports = TeacherProfileQuery;