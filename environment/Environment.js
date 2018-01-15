const Db = require('./../db/Db');

class Environment {
    constructor() {
        this.core = {};
        this.setVars();
        this.init();
    }

    setVars() {

    }

    async init() {
        this.initEnv();
        this.initLog();
        this.initConfigs();
        this.initDb();
    }

    initEnv() {
        try {
            process.env.NODE_ENV = process.env.NODE_ENV || 'local';
            process.env.LOG_LEVEL = process.env.LOG_LEVEL || 'DEBUG'
        } catch (err) {
            console.log('Init Env error:', err);
        }
    }

    initLog() {
        try {
            let log4js = require('log4js');
            this.core.log = log4js.getLogger();
            this.core.log.setLevel(process.env.LOG_LEVEL);
            this.core.log.info('Init log success');
        } catch (err) {
            console.log('Init Log error:', err);
        }
    }

    initConfigs() {
        try {
            this.core.cfg = {};
            this.core.cfg.database = require(`./../config/database/${process.env.NODE_ENV}.json`);
            this.core.cfg.secret = require('./../config/secret/config.json');
            this.core.cfg.shared = require('./../config/shared/config.json');
            this.core.cfg.lang = require('./../config/language/translations.json');
            this.core.log.info('Init configs success');
        } catch (err) {
            console.log('Init Configs error:', err);
        }
    }

    initDb() {
        try {
            Db.connect(this.core.cfg.database.url);
            this.core.db = Db;
            this.core.log.info('Init db success');
        } catch (err) {
            this.core.log.info('Init db error: ', err);
        }
    }
}

module.exports = Environment;