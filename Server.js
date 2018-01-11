'use strict';

global.appRoot = __dirname;
global.p = console.log;
const Environment = require(appRoot + '/environment/Environment');

class Server extends Environment {
    constructor(cb) {
        super(cb);
    }

    async init() {
        await super.init();
        this.initErrorHandlers();
        this.initRouteManager();
        this.createServer();
    }

    initRouteManager() {
        const RouteManager = require(appRoot + '/routing/RouteManager');
        this.core.routeManager = new RouteManager(this.core);
    }

    createServer() {
        const http = require('http');
        this.server = http.createServer((req, res) => this.core.routeManager.handle(req, res));

        this.server.listen(this.port, () => {
            this.core.log.info(`Server listening on: ${this.host}:${this.port}`);
            this.core.stop = this.stop.bind(this);
            this.cb(this.core)
        });
    }

    initErrorHandlers() {
        this.core.errors = require(appRoot + '/routing/ErrorCodes');

        process.on('uncaughtException', (err) => {
            this.core.log.fatal('uncaughtException', err);
            process.exit(1);
        });

        process.on('unhandledRejection', (err) => {
            this.core.log.fatal('unhandledRejection', err);
            process.exit(1);
        })
    }

    async stop() {
        await this.server.close(() => { this.core.log.info('Server closed connection') })
        process.exit(0)
    }

    get port() {
        return process.env.NODE_PORT || '8080';
    }

    get host() {
        return process.env.NODE_HOST || '127:0:0:1'
    }
}

module.exports = Server;
