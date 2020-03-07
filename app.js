const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
// append sockets
const io = require('socket.io').listen(server);

const CONFIG = require('./config');
const bodyParser = require('body-parser');//модуль для POST-запроса

const { PORT, TRIGGERS, EVENTS, MESSAGES } = CONFIG; // конфига
const Mediator = require('./application/modules/Mediator'); // медиатор
// классы модулей
const PolyMath = require('./application/modules/polynomial/polyMath');//математический модуль для многочленов
const ChatManager = require('./application/modules/chatManager/ChatManager');

// подключение модулей
const mediator = new Mediator({ TRIGGERS, EVENTS });
const polyMath = new PolyMath();

new ChatManager({ mediator, io, MESSAGES });

io.on('connection', socket => {
	console.log('connected ', socket.id);
	socket.on('disconnect', () => console.log('disconnect', socket.id));
});

// router
const Router = require('./application/router/Router');
const router = new Router({ mediator, polyMath });
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/', router);

server.listen(PORT, () => console.log(`Port is ${PORT}`));