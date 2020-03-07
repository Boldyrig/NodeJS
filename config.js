const CONFIG = {
    PORT: 3000,

    // список всех триггеров в системе
    TRIGGERS: {
        SQR: 'SQR'
    },

    // список всех событий в системе
    EVENTS: {
        EV1: 'ev1',
        EV2: 'ev2'
    },

    // список всех сокетных сообщений в системе
    MESSAGES: {
        NEW_MESSAGE: 'NEW_MESSAGE' // новое сообщение в чат
    }
};

module.exports = CONFIG;