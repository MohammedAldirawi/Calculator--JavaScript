/*
TODO:
    Limit number input
    Disallow . from being entered multiple times
    Clean up structure
*/

(function () {
    "use strict";

    // Shortcut to get elements
    var el = function (element) {
        if (element.charAt(0) === "#") { // If passed an ID...
            return document.querySelector(element); // ... returns single element
        }

        return document.querySelectorAll(element); // Otherwise, returns a nodelist
    };

    // Variables
    var viewer = el("#viewer"), // Calculator screen where result is displayed
        equals = el("#equals"), // Equal button
        nums = el(".num"), // List of numbers
        ops = el(".ops"), // List of operators
        theNum = "", // Current number
        oldNum = "", // First number
        resultNum, // Result
        operator; // Batman

    // When: Number is clicked. Get the current number selected
    var setNum = function () {
        if (resultNum) { // If a result was displayed, reset number
            theNum = this.getAttribute("data-num");
            resultNum = "";
        } else { // Otherwise, add digit to previous number (this is a string!)
            theNum += this.getAttribute("data-num");
        }

        viewer.innerHTML = theNum; // Display current number

    };

    // When: Operator is clicked. Pass number to oldNum and save operator
    var moveNum = function () {
        oldNum = theNum;
        theNum = "";
        operator = this.getAttribute("data-ops");

        equals.setAttribute("data-result", ""); // Reset result in attr
    };

    // When: Equals is clicked. Calculate result
    var displayNum = function () {

        // Convert string input to numbers
        oldNum = parseFloat(oldNum);
        theNum = parseFloat(theNum);

        // Perform operation
        switch (operator) {
            case "plus":
                resultNum = oldNum + theNum;
                break;

            case "minus":
                resultNum = oldNum - theNum;
                break;

            case "times":
                resultNum = oldNum * theNum;
                break;

            case "divided by":
                resultNum = oldNum / theNum;
                break;

            // If equal is pressed without an operator, keep number and continue
            default:
                resultNum = theNum;
        }

        // If NaN or Infinity returned
        if (!isFinite(resultNum)) {
            if (isNaN(resultNum)) { // If result is not a number; set off by, eg, double-clicking operators
                resultNum = "You broke it!";
            } else { // If result is infinity, set off by dividing by zero
                resultNum = "Look at what you've done";
                el('#calculator').classList.add("broken"); // Break calculator
                el('#reset').classList.add("show"); // And show reset button
            }
        }

        // Display result, finally!
        viewer.innerHTML = resultNum;
        equals.setAttribute("data-result", resultNum);

        // Now reset oldNum & keep result
        oldNum = 0;
        theNum = resultNum;

    };

    // When: Clear button is pressed. Clear everything
    var clearAll = function () {
        oldNum = "";
        theNum = "";
        viewer.innerHTML = "0";
        equals.setAttribute("data-result", resultNum);
    };

    /* The click events */

    // Add click event to numbers
    for (var i = 0, l = nums.length; i < l; i++) {
        nums[i].onclick = setNum;
    }

    // Add click event to operators
    for (var i = 0, l = ops.length; i < l; i++) {
        ops[i].onclick = moveNum;
    }

    // Add click event to equal sign
    equals.onclick = displayNum;

    // Add click event to clear button
    el("#clear").onclick = clearAll;

    // Add click event to reset button
    el("#reset").onclick = function () {
        window.location = window.location;
    };

}());

/*
let operandOne = '';
let operandTwo = '';
let lastOperator = '';
let output = '';

function calc(input) {
    switch (input) {
        case 'A':
            operandTwo = '';
            lastOperator = '';
        case 'C':
            operandOne = '';
            output = '';
            break;
        case '.':
            if (operandOne === '') operandOne = '0.';
            if (operandOne.indexOf('.') > -1) break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            operandOne = `${operandOne}${input}`;
            output = operandOne;
            break;
        case '-':
        case '+':
        case '*':
        case '/':
        case '=':
            if (lastOperator === '') {
                lastOperator = input;
                if (operandTwo === '') operandTwo = operandOne;
                if (operandTwo === '') operandTwo = '0';
                operandOne = '';
                output = operandTwo;
                break;
            }
            if (operandOne === '') {
                lastOperator = input;
                break;
            }
            operandTwo = eval(operandTwo + lastOperator + operandOne).toString();
            operandOne = '';
            output = operandTwo;
            if (input === '=') {
                lastOperator = '';
                break;
            }
            lastOperator = input;
    }

    if (output === 'Infinity' || output === 'NaN') {
        operandOne = '';
        operandTwo = '';
        lastOperator = '';
    }

    if (output === '') output = '0';
    document.getElementById('result').innerHTML = output;
}

document.addEventListener('keypress', (event) => {
    if (event.which === 13) {
        calc('=');
        return;
    }
    calc(String.fromCharCode(event.which));
});

const btns = document.getElementsByClassName('calc-btn');
for (let i = 0; i < btns.length; i += 1) {
    btns[i].addEventListener('click', event => calc(event.target.value));
}
*/

/*
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="cal.css">
    <title>Calculator</title>
</head>

<body>
    <header>
        <h1>JavaScript Calculator</h1>
        <p class="warning">Don't divide by zero</p>
        <div class="calc page-header">
            <div class="row">
                <div class="result-box">
                    <div id="result" class="result">0</div>
                </div>
                <div class="button">
                    <button id="A" class="calc-btn ctrl" value="A">AC</button>
                </div>
                <div class="button">
                    <button id="C" class="calc-btn ctrl" value="C">&nbsp;C</button>
                </div>
                <div class="button">
                    <button id="/" class="calc-btn op" value="/">&nbsp;/</button>
                </div>
                <div class="button">
                    <button id="*" class="calc-btn op" value="*">&nbsp;*</button>
                </div>
                <div class="button">
                    <button id="7" class="calc-btn number" value="7">7</button>
                </div>
                <div class="button">
                    <button id="8" class="calc-btn number" value="8">8</button>
                </div>
                <div class="button">
                    <button id="9" class="calc-btn number" value="9">9</button>
                </div>
                <div class="button">
                    <button id="moins" class="calc-btn op" value="-">-</button>
                </div>
                <div class="button">
                    <button id="4" class="calc-btn number" value="4">4</button>
                </div>
                <div class="button">
                    <button id="5" class="calc-btn number" value="5">5</button>
                </div>
                <div class="button">
                    <button id="6" class="calc-btn number" value="6">6</button>
                </div>
                <div class="button">
                    <button id="plus" class="calc-btn op" value="+">&nbsp;+</button>
                </div>
                <div class="button">
                    <button id="1" class="calc-btn number" value="1">1</button>
                </div>
                <div class="button">
                    <button id="2" class="calc-btn number" value="2">2</button>
                </div>
                <div class="button">
                    <button id="3" class="calc-btn number" value="3">3</button>
                </div>
                <div class="button">
                    <button id="=" class="calc-btn equal" value="=">=</button>
                </div>
                <div class="button zero">
                    <button id="0" class="calc-btn number" value="0">0</button>
                </div>
                <div class="button">
                    <button id="." class="calc-btn number" value=".">&nbsp;.</button>
                </div>
            </div>
        </div>
    </header>
    <footer>
        <div class="footer-copy">
            © 2020 Mohammed Tareq - WhatsApp No +970597786429
        </div>
    </footer>

    <script src="cal.js">
    </script>
</body>

</html>
*/

/*
 *,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
    color: #6cacc5;
    background: #100a1c;
    background-image:
    radial-gradient(50% 30% ellipse at center top, #201e40 0%, rgba(0,0,0,0) 100%),
    radial-gradient(60% 50% ellipse at center bottom, #261226 0%, #100a1c 100%);
    background-attachment: fixed;
    color: #6cacc5;
    font: 300 18px/1.6 "Source Sans Pro",sans-serif;
    margin: 0;
    text-align: center;
    width: 100%;
    height: 100%;
}
h1 {
    font-weight: 300;
    padding-top: 10px;
}

.warning {
    background: -webkit-linear-gradient(45deg,  #c97874 10%, #463042 90%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #8c5059;
    font-weight: 400;
    margin: 0 auto 6em;
    max-width: 9em;
    margin-bottom: 5px;
}

.broken {
    animation: broken 2s;
    transform: translate3d(0,-2000px,0);
    opacity: 0;
}

header {
  width: 100%;
  margin-top: 20px;
}

.calc {
  width: 50%;
  max-width: 900px;
  margin: auto;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.result-box {
  height: 15vh;
  width: 100%;
  margin: 0;
}

.result {
  text-align: right;
  font-size: 3em;
  padding: 0 1em;
  height: 100%;
}

.button {
  height: 12vh;
  width: 25%;
  margin: 0;
}

.calc-btn {
  height: 100%;
  width: 100%;
  font-size: 2em;
  color: white;
}

.button .equal {
  height: 200%;
}

.zero {
  height: 12vh;
  width: 50%;
  margin: 0;
}

.number {
  background-color: rgb(40, 96, 144);
  border: 1px solid rgb(32, 77, 116);
}

.equal {
  background-color: rgb(68, 157, 68);
  border: 1px solid rgb(57, 132, 57);
}

.op {
  background-color: rgb(49, 176, 213);
  border: 1px solid rgb(38, 154, 188);
}

.ctrl {
  background-color: rgb(236, 151, 31);
  border: 1px solid rgb(213, 133, 18);
}

footer {
    margin-top: 15px;
    text-align:center;
}
*/