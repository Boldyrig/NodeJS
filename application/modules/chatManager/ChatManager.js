class ChatManager {
    constructor({ mediator, io, MESSAGES, db }) {
        if (!io) return;
        io.on('connection', socket => {
            socket.on(MESSAGES.NEW_MESSAGE, async data => { 
                
                const user = await db.getUser('mmm');
                console.log(user);
                
                io.local.emit(MESSAGES.NEW_MESSAGE, data) 
            });
        });
    }
}

module.exports = ChatManager;