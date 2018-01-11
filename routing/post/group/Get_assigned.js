const BaseRoute = require(appRoot + '/routing/BaseRoute');

class GroupGetAssignedRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return [];
    }

    get roles() {
        return ['admin', 'teacher']
    }

    async handle() {
        try {
            let assignedGroups;

            const groups = await this.core.db.groups.get();
            const groupList = {courses: [], squads: [], ids: {}}, assignedGroupIds = {};

            if (this.params.discipline_id)
                assignedGroups = await this.core.db.groupDiscipline.get({discipline_id: this.params.discipline_id});
            else
                assignedGroups = await this.core.db.groupDiscipline.get({});

            for (let i = 0; i < assignedGroups.length; i++) {
                assignedGroupIds[assignedGroups[i].group_id] = true;
            }

            for (let i = 0; i < groups.length; i++) {
                if (!assignedGroupIds[groups[i]._id] && this.params.discipline_id)
                    continue;

                if (groupList.squads.indexOf(groups[i].squad) === -1)
                    groupList.squads.push(groups[i].squad);

                if (groupList.courses.indexOf(groups[i].course) === -1)
                    groupList.courses.push(groups[i].course);

                groupList.ids[`${groups[i].course}_${groups[i].squad}`] = groups[i]._id;
            }

            this.complete(groupList);
        } catch (err) {
            this.core.log.error('GroupGetAssignedRoute error', err);
            this.complete(null, err, 'GroupGetAssignedRoute error');
        }
    }
}

module.exports = GroupGetAssignedRoute;
