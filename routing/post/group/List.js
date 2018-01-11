const BaseRoute = require(appRoot + '/routing/BaseRoute');

class GroupListRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return [];
    }

    get roles() {
        return ['admin']
    }

    async handle() {
        try {
            let groups_size = [];
            const groupList = [];

            const groups = await this.core.db.groups.get();

            for (let i = 0; i < groups.length; i++) {
                groups_size.push(
                    await this.core.db.studentProfile.get({group_id: groups[i]._id})
                )
            }

            groups_size = await Promise.all(groups_size);

            for (let i = 0; i < groups.length; i++) {
                groupList.push({
                    course: groups[i].course,
                    squad: groups[i].squad,
                    student_count: groups_size[i].length
                })
            }

            this.complete(groupList);
        } catch (err) {
            this.core.log.error('GroupList error', err);
            this.complete(null, err, 'GroupList error');
        }
    }
}

module.exports = GroupListRoute;