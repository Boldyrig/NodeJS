class HtmlController {
    constructor(containerId, buttonsId, resultId) {
        this.containerId = containerId;
        this.buttonsId = buttonsId;
        this.resultId = resultId;
    }

    printResult(result) {
        let string = this.polynomialToString(result);
        document.getElementById(this.resultId).innerHTML = string;
    }

    printUI(polynomials) {
        const container = document.getElementById(this.containerId);
        const buttons = document.getElementById(this.buttonsId);
        container.innerHTML = '';
        container.appendChild(this.polynomialsToHtml(polynomials));
        buttons.innerHTML = '';
        buttons.appendChild(this.buttonsToHtml());
    }

    buttonsToHtml() {
        let divButtons = this.createHtmlTag('div', {
            id: 'buttons'
        });
        let buttonPlus = this.createHtmlTag('input', {
            id: 'plus',
            value: '+',
            type: 'button'
        });
        buttonPlus.addEventListener('click', this.addPoly);
        let buttonMinus = this.createHtmlTag('input', {
            id: 'minus',
            value: '-',
            type: 'button'
        });
        buttonMinus.addEventListener('click', this.subPoly);
        let buttonMult = this.createHtmlTag('input', {
            id: 'mult',
            value: '*',
            type: 'button'
        });
        buttonMult.addEventListener('click', this.multPoly);
        divButtons.appendChild(buttonPlus);
        divButtons.appendChild(buttonMinus);
        divButtons.appendChild(buttonMult);
        return divButtons;
    }

    polynomialToString(polynomial) {
        let str = '';
        for(let i = 0; i < polynomial.length; i++) {
            str += polynomial[i].koef;
            str += 'x^';
            str += polynomial[i].power;
            if(i < (polynomial.length - 1)) str += ' + ';
        }
        return str;
    }
    
    polynomialsToHtml(polynomials) {
        let divPolynomials = this.createHtmlTag('div', { class:'polynomials' });
        for(let i = 0; i < polynomials.length; i++) {
            let divPolynomial = this.createHtmlTag('div', { class : 'polynomial' });
            polynomials[i].forEach((member, index, array) => {
                let divMember = this.createHtmlTag('div', { class : 'member' });
                let inputKoef = this.createHtmlTag('input', { 
                    polyid: i,
                    memberid: index,
                    class: 'input',
                    //onKeyUp: () => this.setValue(this),
                    id: 'koef',
                    type: 'text',
                    placeholder: member.koef
                });
                inputKoef.addEventListener('keyup', this.setValue);
                let label = this.createHtmlTag('label', { class: 'label' });
                label.textContent = 'X^';
                let inputPower = this.createHtmlTag('input', { 
                    polyid: i,
                    memberid: index,
                    class: 'input',
                    //onKeyUp: () => this.setValue(this),
                    id: 'power',
                    type: 'text',
                    placeholder: member.power
                });
                inputPower.addEventListener('keyup', this.setValue);
                let plus = this.createHtmlTag('label', { class: 'label'});;
                if(index < (array.length - 1)) plus.textContent = ' + ';
                divPolynomial.appendChild(divMember);
                divPolynomial.appendChild(inputKoef);
                divPolynomial.appendChild(label);
                divPolynomial.appendChild(inputPower);
                divPolynomial.appendChild(plus);
            });
            let addButton = this.createHtmlTag('input', {
                class: 'addPoly',
                //onClick: this.addMember,
                id: 'addPoly',
                polyid: i,
                value: 'Добавить член',
                type: 'button'
            });
            addButton.addEventListener('click', this.addMember);
            divPolynomial.appendChild(addButton);
            divPolynomials.appendChild(divPolynomial);
        }
        return divPolynomials;
        // let str = '';
        // for(let i = 0; i < polynomials.length; i++) {
        //     str += '<div class="polynomial">';
        //     polynomials[i].forEach((member, index, array) => {
        //         str += `<div class="member">`;
        //         str += `<input polyid="${i}" memberid="${index}" onKeyUp="setValue(this)" id="koef" type="text" value="${member.koef}"/>`;
        //         str += '*X^';
        //         str += `<input polyid="${i}" memberid="${index}" onKeyUp="setValue(this)" id="power" type="text" value="${member.power}"/>`;
        //         if(index < (array.length - 1)) str += '+';
        //         str += '</div>';
        //     });
        //     str += `<input class="addPoly" onClick="addMember(this)" id="addPoly" polyid="${i}" value="Добавить член" type="button"/>`;
        //     str += '</div>'
        //     str += '<br />';
        // }
        // return str;
    }
    
    // addMember(elemHtml) {
    //     console.log(elemHtml);
    //     //polynomials[elemHtml.getAttribute('polyid')].push({ koef:0, power:0 });
    //     this.printPolynomials();
    // }
    
    // setValue(elem) {//...
    //     if(elem.id == 'koef') polynomials[elem.getAttribute('polyid')][elem.getAttribute('memberid')].koef = elem.value;
    //     if(elem.id == 'power') polynomials[elem.getAttribute('polyid')][elem.getAttribute('memberid')].power = elem.value;
    // }

    createHtmlTag(tag, attributes) {
        let element = document.createElement(tag);
        for(let attrName in attributes) {
            element.setAttribute(attrName, attributes[attrName]);
        }
        return element;
    }

    appendAddMember(cb) {
        if (cb instanceof Function) {
            this.addMember = cb;
        } else {
            this.addMember = () => {};
        }
    }

    appendSetValue(cb) {
        if (cb instanceof Function) {
            this.setValue = cb;
        } else {
            this.setValue = () => {};
        }
    }

    appendAddPoly(cb) {
        if (cb instanceof Function) {
            this.addPoly = cb;
        } else {
            this.addPoly = () => {};
        }
    }

    appendSubPoly(cb) {
        if (cb instanceof Function) {
            this.subPoly = cb;
        } else {
            this.subPoly = () => {};
        }
    }

    appendMultPoly(cb) {
        if (cb instanceof Function) {
            this.multPoly = cb;
        } else {
            this.multPoly = () => {};
        }
    }
}