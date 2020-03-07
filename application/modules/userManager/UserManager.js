class UserManager {
    constructor({ mediator, io, MESSAGES, db }) {

        this.db = db;
        this.MESSAGES = MESSAGES;

        this.users = {};

        if (!io) return;
        io.on('connection', socket => {
            socket.on(MESSAGES.USER_LOGIN, data => this.userLogin(data, socket));
        });
    }

    async userLogin(data = {}, socket) {
        const { login, password } = data;
        const user = await this.db.getUserByLoginPass(login, password);
        if (user) {
            this.users[user.id] = user;
        }
        socket.emit(this.MESSAGES.USER_LOGIN, user ? user : null);
    }
}

module.exports = UserManager;