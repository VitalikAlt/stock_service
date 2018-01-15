const Map = require('./routes/Map');

class SocketManager {
    constructor(core, io) {
        this.core = core;
        this.core.io = io;
        this.handlers = [];
        this.init();
    }

    init() {
        this.core.io.on('connection', (client) => {
            this.registerNewClient(client);

            for (const route in Map) {
                this.handlers[route] = new Map[route](this.core, route);
                client.on(route, (data) => this.handlers[route].process(client, data));
            }

            client.on('disconnect', this.endClientSession);
        })
    }

    registerNewClient(client) {
        return
    }

    endClientSession(a, b, c) {
    }
}

module.exports = SocketManager;