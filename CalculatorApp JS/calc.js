class Calculator {
   constructor(previousdata, currentdata) {
      this.previousdata = previousdata
      this.currentdata = currentdata
      this.clear()
   }


   clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
   }

   delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
   }

   appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
   }

   chooseOperation(operation) {
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
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
            break
         case '−':
            computation = prev - current
            break
         case '×':
            computation = prev * current
            break
         case '÷':
            computation = prev / current
            break
         default:
            return

      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
   }
   getdisplayNumber(number) {
      const stringnumbers = number.toString()
      const integerdigits = parseFloat(stringnumbers.split('.')[0])
      const decimaldigits = stringnumbers.split('.')[1]
      let intergerdisplay
      if (isNaN(integerdigits)) {
         intergerdisplay = ''

      } else {
         intergerdisplay = integerdigits.toLocaleString('en', {
            maximumFractionDigits: 0
         })
      }
      if (decimaldigits != null) {
         return `${intergerdisplay}.${decimaldigits}`
      } else {
         return intergerdisplay
      }
      // const floatNumber = parseFloat(number)  ///
      // if (isNaN(floatNumber)) return ''
      // return floatNumber.toLocaleString('en')
   }

   updateDisplay() {
      this.currentdata.innerText = this.getdisplayNumber(this.currentOperand)
      if (this.operation != null) {
         this.previousdata.innerText = ` ${this.getdisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
         this.previousdata.innerText = ''
      }

   }

}
const previousdata = document.querySelector('[data-previous]');
const currentdata = document.querySelector('[data-current]');
const allclearbtn = document.querySelector('[data-all-clear]');
const deletebtn = document.querySelector('[data-delete]');
const datanumber = document.querySelectorAll('[data-number]');
const dataoperations = document.querySelectorAll('[data-operations]');
const equalsbtn = document.querySelector('[data-equals]');

const calculator = new Calculator(previousdata, currentdata)

datanumber.forEach(button => {
   button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
   })
})
dataoperations.forEach(button => {
   button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
   })
})

equalsbtn.addEventListener('click', button => {
   calculator.compute()
   calculator.updateDisplay()
})

allclearbtn.addEventListener('click', button => {
   calculator.clear()
   calculator.updateDisplay()
})

deletebtn.addEventListener('click', button => {
   calculator.delete()
   calculator.updateDisplay()
})