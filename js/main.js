import generalControl from "./controlModeDicts.js";

let valuesActive;
let result = false;

const spanFirstText = document.getElementById('span_text_first');
const spanSecondText = document.getElementById('span_second_text');
const inputText = document.getElementById('input_text');
const spanResultText = document.getElementById('text_result');
const buttonResetTexts = document.getElementById('reset');
const buttonEye = document.getElementById('img_eye');

const spanInfoNumConHits = document.getElementById('spanInfoNumberConHits');
const spanInfoNumHits = document.getElementById('spanInfoNumberHits');
const spanInfoRecord = document.getElementById('Record');
const spanInfoErrors = document.getElementById('Errors');

const buttonHide = document.getElementById("hiden_container_2");
const buttonChoiceText = document.getElementById("chekbox-reverse");


class RecordResultControl{
    constructor(){
        this.record = null;
        this.result = false;
        this.numHits = 0;
        this.NumConHits = 0;
        this.errors = 0;
    }

    fixRecord(boll){
        if(boll){
            this.correct();
            this.result = true;
        }else{
            this.error();
            this.result = false;

        }
    }


    correct(){
        this.controlHit();
        this.controlNumConHits();
        this.controlRecord();
    }

    error(){
        this.controlError();
        this.controlNumConHits();
    }
    //  control
    controlHit(){
        this.NumConHits = this.NumConHits + 1;
        setSpanTextContent(spanInfoNumHits, this.NumConHits);
    }

    controlNumConHits(){
        if(this.result){
            this.numHits = this.numHits + 1;
        }else{
            this.numHits = 0;
        }
        setSpanTextContent(spanInfoNumConHits, this.numHits);
    }
    
    controlRecord(){
        if (this.record == null){
            this.record =  JSON.parse(localStorage.getItem('recorde')) || 0;
        }
        if (this.numHits > this.record ){
            this.record = this.numHits;
            localStorage.setItem('recorde', JSON.stringify(this.numHits));
        }
        setSpanTextContent(spanInfoRecord, this.record);
    }

    controlError(){
        this.errors = this.errors + 1 ;
        setSpanTextContent(spanInfoErrors,this.errors);
    }
}

class SetStyleResult{
    fixStyles(boll){
        if(boll){
            this.correctStyles();
        }else{
            this.errorStyle();
            this.ErrorclassStylesAnimation();
        }
    }
    correctStyles(){
        const text = `${valuesActive[0]} - ${valuesActive[1]}`;
        setSpanTextContent(spanResultText,text);
        setSpanColor(spanResultText, "yellow");
        setSpanColor(spanSecondText, "yellow");
        eyeOpen();
    }    

    errorStyle(){
        setSpanTextContent(spanResultText, "Tente Novamente");
        setSpanColor(spanSecondText, "red");
        setSpanColor(spanResultText, "red");
        
    }

    ErrorclassStylesAnimation() {
        spanSecondText.classList.add("animationSpan2");
        function remove(){
            spanSecondText.classList.remove("animationSpan2");
        }
        setTimeout(remove,1000);
    }

}

class GeneralControlText{
    constructor(generalControl){
        this.moldecontrol = generalControl;
        this.list_key;
        this.arrayValues;
        this.id = 0;
    }

    getValue(){
        this.makeArraysOfKeys();
        this.setOrdem();
        this.setValue();
        return this.arrayValues;
    }

    checkReverseText(){
        const chekbox = document.getElementById("chekbox-reverse").checked;
        return chekbox;
    }
    
    setOrdem(){
        const filterOrdem = document.getElementById("input_checkbox_ordem");
        this.ordem = filterOrdem.checked;
    }

    setValue(){
        const dict_value = this.filterOrdem();
        let arrayValue = [];
        arrayValue.push(dict_value["en"]);
        arrayValue.push(dict_value["pt"]);
        const chekcReverse = this.checkReverseText();
        arrayValue = chekcReverse? arrayValue.reverse():arrayValue;
        this.arrayValues = arrayValue;
    }
 
    filterOrdem(){
        const value = this.ordem ? this.sequenceKey():this.randomKey();
        return value;
    }    
 
    makeArraysOfKeys(){
        this.list_key = Object.keys(this.moldecontrol.dict);
    }

    randomKey(){
        const amount = this.list_key.length;
        const randomNum = Math.floor(Math.random() * amount);
        const key = this.list_key[randomNum];
        return this.moldecontrol.dict[key];
    }
    
    sequenceKey(){
        if (this.list_key.length <= this.id){
            this.id = 0;
            return newSetupText();
        }else{
            const key = this.list_key[this.id];
            this.id += 1 ;
            return this.moldecontrol.dict[key];
        }
    }
    newChanges(){
        generalControl.getAllParam()
        this.moldecontrol = generalControl
        starNew();
    } 
}
// Class
const recordResultControl = new RecordResultControl();
const setStyleResult = new SetStyleResult();
const controltext = new GeneralControlText(generalControl);

// Eventos
buttonChoiceText.addEventListener('click',newSetupText);
buttonHide.addEventListener('click',controlContainerHiddenAdd);
inputText.addEventListener('keydown',inputValue);
buttonResetTexts.addEventListener('click',starNew);
buttonEye.addEventListener('click',controlEyeImg);

inputText.addEventListener('focus',hidenEmail)
inputText.addEventListener('blur',nothidenEmail)


function hidenEmail(){
    const boxEmail = document.getElementsByClassName("footer")[0]
    boxEmail.style.opacity = "0.2"
}
function nothidenEmail(){
    const boxEmail = document.getElementsByClassName("footer")[0]
    boxEmail.style.opacity = "1.0"
}

function controlEyeImg(evento){
    const event = evento.target.dataset.eye;
    event != "open" ? eyeOpen():eyeClosed();
}

function controlContainerHiddenAdd(e){
    const text = e.target.textContent;
    const container = document.querySelector(".container_2_flex");
    if(text === "Ocultar"){
        container.style.display = 'none';
    }else{
        container.style.display = 'flex';
    }
    e.target.textContent = text == "Ocultar"? "Mostra": "Ocultar";
}

function setSpanTextContent(span,text){
    span.textContent = text;
}

function setSpanColor(span,color){
    span.style.color = color;
}

function starNew(){
    newSetupText();
    setSpanTextContent(spanResultText, '');
    setSpanColor(spanSecondText, 'black');
    inputText.value = '';
    eyeClosed();
}

function inputValue(event){
    const event_key = (event.key == "Enter");
    if (result == true){
        starNew();
        result = false;
    }else{
        if(event_key && valuesActive){
            const value = event.target.value.toLowerCase().trim();
            result = checkAnswer(value);
            
            recordResultControl.fixRecord(result);
            setStyleResult.fixStyles(result);
    }
    }
}

function checkAnswer(inputValue){
    const value = valuesActive[1]
    return value.toLowerCase() == inputValue.toLowerCase();
}

function eyeClosed(){
    buttonEye.src = './img/eyes_is_closed.png';
    buttonEye.dataset.eye = "closed";
    if(valuesActive){
        setSpanTextContent(spanSecondText, stringForHifen(valuesActive[1]));
    }
}

function eyeOpen(){
    buttonEye.src = './img/eyes_is_open.png';
    buttonEye.dataset.eye = "open";
    if(valuesActive){
        setSpanTextContent(spanSecondText, valuesActive[1]);
    }
}

function setError(error){
    setSpanTextContent(spanFirstText, error);
    setSpanTextContent(spanSecondText, error);
    valuesActive = "";
}

function newSetupText(){
    if (generalControl.dict == "error"){
        setError(generalControl.error);
    }else {
        const arryValues = controltext.getValue();
        valuesActive = arryValues;
        setSpanTextContent(spanFirstText, valuesActive[0]);
        setSpanTextContent(spanSecondText, stringForHifen(valuesActive[1]));
    }
}
  
function stringForHifen(string){
    const arrayString = String(string).split(" ");
    let finaly = "";
    arrayString.forEach(element =>{
        const qtd = element.length;
        finaly += "-".repeat(qtd) + " ";
    })
    finaly = finaly.trim();
    return finaly;
}

recordResultControl.controlRecord();
newSetupText();


export {controltext};