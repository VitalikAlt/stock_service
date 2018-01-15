const List = require('./handlers/users/List');
const SignIn = require('./handlers/users/SignIn');
const ResetAdmin = require('./handlers/users/ResetAdmin');

class SocketManager {
    constructor(core, io) {
        this.io = io;
        this.core = core;
        this.createHandlers();
        this.init();
    }

    init() {
        this.io.on('connection', (client) => {
            this.registerNewClient(client);

            client.on('sign_in', (data) => this.handlers.signIn.process(client, data));
            client.on('user_list', (data) => this.handlers.userList.process(client, data));
            client.on('reset_admin', (data) => this.handlers.resetAdmin.process(client, data));

            client.on('disconnect', this.endClientSession);
        })
    }

    createHandlers() {
        this.handlers = [];

        this.handlers.signIn = new SignIn(this.core, 'sign_in');
        this.handlers.userList = new List(this.core, 'user_list');
        this.handlers.resetAdmin = new ResetAdmin(this.core, 'reset_admin');
    }

    registerNewClient(client) {
        return
    }

    endClientSession(a, b, c) {
    }
}

module.exports = SocketManager;