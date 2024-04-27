//animation for lighiting
const buttonsMode = document.querySelectorAll(".btn-mode");
buttonsMode.forEach(function(e,index){
    let attributeValues = [];
    buttonsMode.forEach(function(e){
        attributeValues.push(e.firstElementChild.getAttribute("name"));
    });
    if(e.classList.contains("active")){
        Slicing(attributeValues,e);
    }
    e.onclick = function(){
        buttonsMode.forEach(function(elm){
            elm.classList.remove("active");
            buttonsMode[0].firstElementChild.setAttribute("name",attributeValues[0]);
            buttonsMode[1].firstElementChild.setAttribute("name",attributeValues[1]);
        });
        this.classList.add("active");
        window.localStorage.setItem("choose-lighting",index);
        Slicing(attributeValues, this);
        if(this.classList.contains("light")){
            document.body.classList.add("light-mode");
        }else{
            document.body.classList.remove("light-mode");
        }
    }
    function Slicing(table, Element){
        let searchValue = table[table.indexOf(Element.firstElementChild.getAttribute("name"))];
        Element.firstElementChild.setAttribute("name", searchValue.slice(0, searchValue.indexOf("-")));
    }
});
if(window.localStorage.getItem("choose-lighting")){
    buttonsMode[window.localStorage.getItem("choose-lighting")].click();
}
//methodes calculate
const readingScreen = document.getElementById("reading-screen");
const resultScreen = document.getElementById("result-screen");
const numbersButtons = document.querySelectorAll(".numbers");
const clearButton = document.querySelector(".clear");
const calculateButton = document.querySelector(".equale");
const backSpaceButton = document.querySelector(".backspace");
const operationButton = document.querySelectorAll(".operation");
let nextProcess = "";
numbersButtons.forEach(function(e){
    e.addEventListener("click", function(){
        if(readingScreen.value === ""){
            if(resultScreen.value == 0){
                resultScreen.value = "";
            }
            resultScreen.value += this.dataset.value;
            if(resultScreen.value.length >= 14){
                resultScreen.style.fontSize = "1.5rem";
            }
            if(resultScreen.value.length >= 19){
                resultScreen.style.fontSize = "1.2rem";
            }
        }else{
            readingScreen.value += this.dataset.value;
            nextProcess += this.dataset.value;
            if(nextProcess[0] == this.dataset.value){
                calculateButton.disabled = true;
            }   
        }
    });
});
let sign = [];
operationButton.forEach(function(e){
    e.onclick = function(){
        if(readingScreen.value != ""){
            readingScreen.value += this.dataset.value;
            nextProcess += this.dataset.value; 
        }else{
            resultScreen.value += this.dataset.value;
            sign.push(this.dataset.value);
        }
    }
});
clearButton.addEventListener("click", function(){
    resultScreen.style.fontSize = "2rem";
    resultScreen.value = 0;
    readingScreen.value = "";
    sign = [];
    nextProcess = "";
}); 
backSpaceButton.addEventListener("click", function(){
    if(readingScreen.value != ""){
        readingScreen.value = readingScreen.value.slice(0,readingScreen.value.length - 1);
        nextProcess = nextProcess.slice(0,nextProcess.length - 1);
        calculateButton.disabled = false;
    }else{
        resultScreen.value = resultScreen.value.slice(0,resultScreen.value.length - 1);
    }
    if(resultScreen.value.length === 0){
        resultScreen.value = 0;
    }
    if(resultScreen.value.length <= 13){
        resultScreen.style.fontSize = "2rem";
    }else if(resultScreen.value.length <= 18){
        resultScreen.style.fontSize = "1.5rem";
    }
});
calculateButton.addEventListener("click",function(){
    if(readingScreen.value != ""){
        resultScreen.value = calc(resultScreen.value+""+nextProcess);
    }else{
        if(resultScreen.value != 0){
            readingScreen.value = resultScreen.value;
            readingScreen.value = readingScreen.value.replaceAll(",",".");
            let result = "";
            switch(sign[0]){
                case "+":
                    result = parseFloat(readingScreen.value.split("+")[0]) + parseFloat(readingScreen.value.split("+")[1]);
                    break;
                case "-":
                    result = parseFloat(readingScreen.value.split("-")[0]) - parseFloat(readingScreen.value.split("-")[1]);
                    break;
                case "×":
                    result = parseFloat(readingScreen.value.split("×")[0]) * parseFloat(readingScreen.value.split("×")[1]);
                    break;
                case "/":
                    result = parseFloat(readingScreen.value.split("/")[0]) / parseFloat(readingScreen.value.split("/")[1]);
                    break;
                case "%":
                    result = parseFloat(readingScreen.value.split("%")[0]) % parseFloat(readingScreen.value.split("%")[1]);
                    break;
            }
            if(sign.length > 1){
                resultScreen.value = calc(readingScreen.value);
            }else{
                resultScreen.value = result.toString().replace(".",",");
            } 
        }
    }
});
function calc(value){
    if(value.includes("×")){
        value = value.replaceAll("×","*");
    }
    if(value.includes(",")){
        value  = value.replaceAll(",",".");
    }
    let result = Function('return ' + value)();
    result = result.toString().replace(".",",");
    return result;
}













