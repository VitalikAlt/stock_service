const BaseRoute = require(appRoot + '/routing/BaseRoute');

//TODO сделать удаление групп, у которых курс выше порога
class GroupUpRoute extends BaseRoute {
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
            const groups_queries = [];

            const groups = await this.core.db.groups.get();

            for (let i = 0; i < groups.length; i++) {
                if (groups[i].course + 1 >= 6)
                    continue;

                groups_queries.push(
                    await this.core.db.groups.update({course: groups[i].course + 1}, {_id: groups[i]._id})
                )
            }

            await Promise.all(groups_queries);
            this.complete(true);
        } catch (err) {
            this.core.log.error('GroupUp error', err);
            this.complete(null, err, 'GroupUp error');
        }
    }
}

module.exports = GroupUpRoute;