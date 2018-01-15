const param_translations = require('./../../../config/shared/param_translations.json');

class Errors {
    static BAD_PARAMS(param) {
        return {
            type: 'error',
            result: `Отсутствует поле "${param_translations[param]}" в запросе`
        }
    }

    static NO_HANDLER() {
        return {
            type: 'error',
            result: 'Обработчик для запроса отсутствует'
        }
    }
}

module.exports = Errors;