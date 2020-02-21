const express = require('express');
const app = express();
const CONFIG = require('./config');
const bodyParser = require('body-parser');//модуль для POST-запроса

const { PORT } = CONFIG;
const PolyMath = require('./application/modules/polynomial/polyMath');//математический модуль для многочленов
const polyMath = new PolyMath();
const Polynomial = require('./application/modules/polynomial/Polynomial');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/poly/get/:value', (req, res) => {
    let { value } = req.params;
    res.send({
        result: poly.getValue(value)
    });
});

app.get('/power/:value/:power', (req, res) => {
    const { value, power } = req.params;
    res.send({
        result: Math.pow(value, power)
    });
});

app.post('/poly/sum', (req, res) => {
    let poly1 = new Polynomial(req.body[0]);
    let poly2 = new Polynomial(req.body[1]);
    let answer = polyMath.add(poly1, poly2);
    res.send(answer.members);
});

app.post('/poly/sub', (req, res) => {
    let poly1 = new Polynomial(req.body[0]);
    let poly2 = new Polynomial(req.body[1]);
    let answer = polyMath.sub(poly1, poly2);
    res.send(answer.members);
});

app.post('/poly/mult', (req, res) => {
    let poly1 = new Polynomial(req.body[0]);
    let poly2 = new Polynomial(req.body[1]);
    let answer = polyMath.mult(poly1, poly2);
    res.send(answer.members);
});

app.all('/*', (req, res) => {
    res.send(`Уйди отсюда. Твоего ${req.url} не существует`);
});

app.listen(PORT, () => {
    console.log(`Port is ${PORT}`);
});