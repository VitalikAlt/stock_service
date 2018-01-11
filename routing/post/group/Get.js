const BaseRoute = require(appRoot + '/routing/BaseRoute');

class GroupGetRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['discipline_id'];
    }

    get roles() {
        return ['admin']
    }

    async handle() {
        try {
            const groupList = [], assignedGroupIds = {};

            const groups = await this.core.db.groups.get();
            const assignedGroups = await this.core.db.groupDiscipline.get({discipline_id: this.params.discipline_id});

            for (let i = 0; i < assignedGroups.length; i++) {
                assignedGroupIds[assignedGroups[i].group_id] = true;
            }

            for (let i = 0; i < groups.length; i++) {
                groupList.push({
                    id: groups[i]._id,
                    course: groups[i].course,
                    squad: groups[i].squad,
                    assigned: !!assignedGroupIds[groups[i]._id]
                })
            }

            this.complete(groupList);
        } catch (err) {
            this.core.log.error('GroupGet error', err);
            this.complete(null, err, 'GroupGet error');
        }
    }
}

module.exports = GroupGetRoute;