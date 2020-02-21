const server = new Server('http://localhost:3000');
const htmlController = new HtmlController('container', 'buttons', 'result');
//колбеки
htmlController.appendAddMember(addMemberCB);
htmlController.appendSetValue(setValueCB);
htmlController.appendAddPoly(addPolyCB);
htmlController.appendSubPoly(subPolyCB);
htmlController.appendMultPoly(multPolyCB);

window.onload = () => {
    htmlController.printUI(polynomials);
};

var polynomials = [
    [
        { koef: 0, power: 0 }
    ], 
    [
        { koef: 0, power: 0 }
    ]
];

async function addPolyCB() {
    let result = await server.addPolynomials(polynomials);
    htmlController.printResult(result);
}

async function subPolyCB() {
    let result = await server.subPolynomials(polynomials);
    console.log(result);
    htmlController.printResult(result);
}

async function multPolyCB() {
    let result = await server.multPolynomials(polynomials);
    htmlController.printResult(result);
}

function addMemberCB(event) {
    let polyId = event.path[0].getAttribute('polyId');
    polynomials[polyId].push({ koef: 0, power: 0 });
    htmlController.printUI(polynomials);
}

function setValueCB(event) {
    let htmlElem = event.path[0];
    let polyId = htmlElem.getAttribute('polyid');
    let memberId = htmlElem.getAttribute('memberid');
    let valueId = htmlElem.getAttribute('id');
    polynomials[polyId][memberId][valueId] = parseInt(htmlElem.value);
}