class ChatManager {
    constructor({ mediator, io, MESSAGES }) {
        if (!io) return;
        io.on('connection', socket => {
            socket.on(MESSAGES.NEW_MESSAGE, 
                data => io.local.emit(MESSAGES.NEW_MESSAGE, data)
            );
        });
    }
}

module.exports = ChatManager;