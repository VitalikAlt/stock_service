const BaseRoute = require(appRoot + '/routing/BaseRoute');

//TODO добавить ошибку, когда нет такой дисциплины
class DisciplineUpdateRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['discipline_id', 'assigned_group_ids'];
    }


    get roles() {
        return ['admin']
    }

    async handle() {
        try {
            const updateQueries = [];
            const currentAssignedIds = [];
            const currentAssignedGroups = await this.core.db.groupDiscipline.get({discipline_id: this.params.discipline_id});

            for (let i = 0; i < currentAssignedGroups.length; i++) {
                currentAssignedIds.push(currentAssignedGroups[i].group_id);
            }

            console.log(currentAssignedIds, this.params.assigned_group_ids)

            for (let i = this.params.assigned_group_ids.length - 1; i >= 0; i--) {
                const index = currentAssignedIds.indexOf(this.params.assigned_group_ids[i]);

                if (index !== -1) {
                    currentAssignedIds.splice(index, 1);
                    continue;
                }

                console.log(currentAssignedIds)

                updateQueries.push(
                    await this.core.db.groupDiscipline.add(this.params.discipline_id, this.params.assigned_group_ids[i])
                )
            }

            for (let i = 0; i < currentAssignedIds.length; i++) {
                updateQueries.push(
                    await this.core.db.groupDiscipline.delete({
                        discipline_id: this.params.discipline_id,
                        group_id: currentAssignedIds[i]
                    })
                )
            }

            await Promise.all(updateQueries);
            this.complete(true);
        } catch (err) {
            this.core.log.error('DisciplineUpdate error', err);
            this.complete(null, err, 'DisciplineUpdate error');
        }
    }
}

module.exports = DisciplineUpdateRoute;