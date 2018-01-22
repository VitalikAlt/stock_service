const Map = require('./routes/Map');
const cookie = require('cookie');

class SocketManager {
    constructor(core, io) {
        this.core = core;
        this.core.io = io;
        this.init();
    }

    init() {
        this.core.io.on('connection', (client) => {
            this.registerNewClient(client);

            for (const route in Map) {
                client.on(route, (data) => (new Map[route](this.core, route)).process(client, data));
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