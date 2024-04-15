import { localSaving } from "./addDicionario.js";
import { padraoDict } from "./dict_default.js";
import {controltext} from "./main.js";

const buttonAlert = document.getElementById("button_alert_dicionario");

const dataLocation = document.getElementById("input_checkbox_location");
const pPadrao = document.getElementById("padrao");
const pAdicionar = document.getElementById("adicionar");

const filtroOrdem = document.getElementById("input_checkbox_ordem");
const pAleatorio = document.getElementById("aleatorio");
const pSequencial = document.getElementById("sequencial");

const choicesAddDict = document.getElementById("input_checkbox_choices");
const pPhrases = document.getElementById("choice_phrase");
const pWords = document.getElementById("choice_words");

dataLocation.addEventListener("change",choicesLocation);

filtroOrdem.addEventListener("change",controlaordem);

choicesAddDict.addEventListener("change",choice_get_localstore);

class GeneralControl{
    constructor(){
        this.location;
        this.error;
        this.dict;
        this.getAllParam();
    }

    getAllParam(){
        this.checkerChekbox();
        if (this.location && this.objeto ){
            this.getDict("phrase");
        }else if (this.location && !this.objeto){
            this.getDict("word");
        }else{
            this.dict = padraoDict;
        }
    }

    checkerChekbox(){
        this.location = dataLocation.checked;
        this.objeto = choicesAddDict.checked;
    }

    getDict(key){
        const dict = JSON.parse(localStorage.getItem(localSaving[key])) || false;
        if(dict && Object.keys(dict).length > 0){
            this.dict = dict;
        }else{
            this.dict = "error";
            this.error = `Para utilizar ${key} adicione as!`;
        }
    }

}

const generalControl = new GeneralControl();

function blockedChekbox(boll){
    filtroOrdem.disabled = boll;
    choicesAddDict.disabled = boll;
    textThrough(boll);
}
function textThrough(boll){
    pAleatorio.style.textDecoration = boll == true ?"line-through": "";
    pSequencial.style.textDecoration = boll == true ?"line-through": "";
    pPhrases.style.textDecoration = boll == true ?"line-through": "";
    pWords.style.textDecoration = boll == true ?"line-through": "";
}

function choicesLocation(){
    // new dict
    controltext.newChanges()

    const check = dataLocation.checked;
    if (check){
        Color.colors(pAdicionar,pPadrao);
        blockedChekbox(false);

    }else{
        Color.colors(pPadrao,pAdicionar);
        blockedChekbox(true);
    }   
}

function controlaordem(){
    // new dict
    controltext.newChanges()

    const check = filtroOrdem.checked;

    if(check){
        Color.colors(pSequencial,pAleatorio);
    }else{
        Color.colors(pAleatorio,pSequencial);
    }
}

function choice_get_localstore(){
    // new dict
    controltext.newChanges()

    const check = choicesAddDict.checked;

    if (check){
        Color.colors(pPhrases,pWords);
    }else{
        Color.colors(pWords,pPhrases);
    }
}

class Color{
    static colors(button_red,button_white){
        Color.colorControlRed(button_red);
        Color.colorControlWhite(button_white);
    }

    static colorControlRed(button){
        button.style.color = "red";
    }
    
    static colorControlWhite(button){
        button.style.color = "white";
    }
}


buttonAlert.addEventListener('click',()=>{
    const buttonRemove = buttonAlert.parentNode.parentNode;
    buttonRemove.remove();
})

blockedChekbox(true);

export default generalControl;