class Calculator {
    constructor( previousTextEl, currentTextEl) {
        this.previousTextEl = previousTextEl
        this.currentTextEl = currentTextEl
        this.clear()
    }
    
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.previousTextEl.innerText = ''
        this.operation = undefined
    }
    
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    
    chooseOperation(operation) {
        if ( this.currentOperand === '') return
        if ( this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        
        switch (this.operation) {
            case '+':
            computation = prev + current
            break;
            case '-':
            computation = prev - current
            break;
            case '*':
            computation = prev * current
            break;
            case '/':
            computation = prev / current
            break
            default:
            return
        }

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
        this.currentTextEl.innerText = ''
    }
    
    updateDisplay(){
        this.currentTextEl.innerText = this.currentOperand
        if ( this.operation != null) {
            this.previousTextEl.innerText = 
            `${this.previousOperand} ${this.operation} ${this.currentOperand}`
        
        }
    }
}

// Selecting everything on a calculator

const numberButtons = document.querySelectorAll('[data-num]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-del]')
const allClearButton = document.querySelector('[data-ac]')
const previousTextEl = document.querySelector('.previous-operand')
const currentTextEl = document.querySelector('.current-operand')

/*----------------------*/

const calculator = new Calculator(previousTextEl,currentTextEl)

numberButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


operationButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})


equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
    
    
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})