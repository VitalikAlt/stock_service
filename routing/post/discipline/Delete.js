const BaseRoute = require(appRoot + '/routing/BaseRoute');

//TODO добавить удаление оценок для дисциплины
class DisciplineDeleteRoute extends BaseRoute {
    constructor(core, req, res, params) {
        super(core, req, res, params);
    }

    get paramNames() {
        return ['id'];
    }

    get roles() {
        return ['admin']
    }

    async handle() {
        try {
            await Promise.all([
                await this.core.db.discipline.delete({_id: this.params.id}),
                await this.core.db.groupDiscipline.delete({discipline_id: this.params.id})
            ]);

            this.complete(true);
        } catch (err) {
            this.core.log.error('DisciplineDelete error', err);
            this.complete(null, err, 'DisciplineDelete error');
        }
    }
}

module.exports = DisciplineDeleteRoute;