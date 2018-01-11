class ErrorCodes {
    static BAD_PARAMS(param) {
        return {
            status: 400,
            error: 'Bad params in request',
            message: `no field ${param} in params`
        }
    }

    static UNAUTHORIZED(param) {
        return {
            status: 401,
            error: 'User unauthorized',
            message: 'Incorrect login or password'
        }
    }

    static NO_PERMISSION() {
        return {
            status: 401,
            error: 'No permission',
            message: 'no permission for this action'
        }
    }

    static UNSUPPORTED_METHOD(param) {
        return {
            status: 405,
            error: 'Request method is unsupported',
            message: `method ${param} in unsupported`
        }
    }

    static MODULE_NOT_FOUND(param) {
        return {
            status: 501,
            error: 'No handler found',
            message: `no handler for ${param}`
        }
    }

    static REQUEST_ENTITY_TOO_LARGE(param) {
        return {
            status: 413,
            error: 'Request entity too large',
            message: `request ${param} has too large data`
        }
    }

    static UNKNOWN_ERROR(url, err) {
        return {
            status: 500,
            error: 'Unknown error',
            message: `request handle in RouteManager error: ${JSON.stringify(err)}`
        }
    }

    static JSON_PARSE_ERROR(err) {
        return {
            status: 500,
            error: 'Json parse error',
            message: `error, when parse json ${JSON.stringify(err)}`
        }
    }
}

module.exports = ErrorCodes;