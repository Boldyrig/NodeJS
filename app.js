const express = require('express');
const app = express();
const CONFIG = require('./config');
const bodyParser = require('body-parser');//модуль для POST-запроса

const { PORT, TRIGGERS, EVENTS } = CONFIG; // конфига
const Mediator = require('./application/modules/Mediator'); // медиатор
// классы модулей
const PolyMath = require('./application/modules/polynomial/polyMath');//математический модуль для многочленов

// подключение модулей
const mediator = new Mediator({ TRIGGERS, EVENTS });
const polyMath = new PolyMath();

// router
const Router = require('./application/router/Router');
const router = new Router({ mediator, polyMath });
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Port is ${PORT}`);
});