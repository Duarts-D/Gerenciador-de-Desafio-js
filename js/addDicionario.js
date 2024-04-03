import randomIngles from "./main.js";

const buttonSalvar = document.getElementById('button_salvar');
const inputIngles = document.getElementById('ingles_input');
const inputPt = document.getElementById('pt_input');
const error_input_ingles = document.querySelector('.error_input_ingles');
const error_input_pt = document.querySelector('.error_input_pt');
const container_2_inputs  = document.querySelector('.container_2_bloco_1');
const choicesAdd = document.querySelectorAll("[data-rotate-add]");
export const localSaving = {
    "phrase":"my_dict_phrase",
    "word":"my_dict_word",
}
let dataSavingLocation = localSaving["word"]
const labelInput = document.querySelectorAll("[data-label]")
import generalControl from "./controlModeDicts.js";


// change of the saving
choicesAdd.forEach((e)=>{
    e.addEventListener('click', () =>{
        saveModelControl();
        addColorSwitch();
    })
})

function addColorSwitch(){
    choicesAdd.forEach((e)=>{
        let color = "white"
        if (dataSavingLocation == localSaving["phrase"]){
            color = "red"
        }else{
            color = "white"
        }
        e.src = `/img/seta_${color}.png`
        labelInput.forEach((e)=>{
            e.style.color = color
        })
    })
}

function saveModelControl(){
    // Control of choices the at localizacao for save
    const title = document.getElementById('add_title');
    const palavra = "Adicionar Palavra";
    const frase = "Adicionar Frase";
    if (title.textContent == palavra){
        title.textContent = frase;
        title.style.color = "red";
        // change for mode of phrase save
        dataSavingLocation = localSaving["phrase"];
    }else{
        title.textContent = palavra;
        title.style.color = "white";
        // change for mode of word save
        dataSavingLocation = localSaving["word"];
    }
}

buttonSalvar.addEventListener('click',(e)=>{
    e.preventDefault();
    const validate_ingles = validateCampo(inputIngles);
    const validate_pt = validateCampo(inputPt);
    if(validate_ingles && validate_pt){
        const valueEn = inputIngles.value;
        const valuePT = inputPt.value;
        const handleData = new DataHandler(dataSavingLocation, valueEn, valuePT);
        if (handleData.saveDict()){
            // get new dict
            generalControl.getAllParam()

            inputIngles.value = '';
            inputPt.value = '';
            const salvo = document.getElementById('sucesso');
            setTimeout(function(){salvo.textContent = ''},5000);
            salvo.textContent = 'Salvo com sucesso';
            randomIngles();
        }
    }
})

inputIngles.addEventListener('blur',()=>{
    validateCampo(inputIngles);
})

inputIngles.addEventListener('input',()=>{
    error_input_ingles.textContent = '';
})

inputPt.addEventListener('blur',()=>{
    validateCampo(inputPt);
})

inputPt.addEventListener('input',()=>{
    error_input_pt.textContent = '';
})

function validateCampo(campo){
    const validity = campo.validity.valueMissing;
    const name = campo.name;
    if(validity){
        if(name === 'ingles'){
            error_input_ingles.textContent = 'Preenchar o campo';
        }else{
            error_input_pt.textContent = 'Preenchar o campo';
        }
    }else{
        if(name === 'ingles'){
            error_input_ingles.textContent = '';
        }else{
            error_input_pt.textContent = '';
        }
    }
    return !validity;
}

// Control of errors
container_2_inputs.addEventListener('mouseleave',()=>{
    setTimeout(removeError,((15*1000)));
})

function removeError(){
    error_input_ingles.textContent = '';
    error_input_pt.textContent = '';
}

class DataHandler {
    constructor(local, v_ingles, v_pt){
        this.local = local;
        this.v_ingles = v_ingles;
        this.v_pt = v_pt;
    }

    saveDict(){
        const my_dicionario = JSON.parse(localStorage.getItem(this.local)) || {};
        const dictOrganizado = this.organizeDict(this.v_ingles,this.v_pt);
        const id = this.preparationId(this.local);
        my_dicionario[id] = dictOrganizado;
        localStorage.setItem(this.local, JSON.stringify(my_dicionario));
        return true;
    }
    
    preparationId(){
        let id = JSON.parse(localStorage.getItem(`id_${this.local}`)) || 0;
        id = parseInt(id) + 1;
        localStorage.setItem(`id_${this.local}`, JSON.stringify(id));
        return id;
    }
    
    organizeDict(){
        const pt_ = this.stringForHifen(this.v_pt);
        const en_ = this.stringForHifen(this.v_ingles);
        const new_dict = {"pt": this.v_pt,
                    "en": this.v_ingles,
                    "pt_": pt_,
                    "en_": en_
                    }
        return new_dict;
    }
    
    stringForHifen(string){
        const array_string = String(string).split(" ");
        let finaly_ = "";
        array_string.forEach(element =>{
            const qtd = element.length;
            finaly_ += "-".repeat(qtd) + " ";
        })
        finaly_ = finaly_.trim();
        return finaly_;
    }
}

function changeLocalStorageMode(){
    // Changing phrases or words already saved to a new format once
    const unique = JSON.parse(localStorage.getItem("unique")) || false
    const my_dicionario = JSON.parse(localStorage.getItem("my_dicionario")) || {}

    if (unique == false){
        let id = 0
        id = parseInt(id)
        for (let key in my_dicionario){
            const v_ingles = key
            const v_pt = my_dicionario[key]
            const new_dict = organizeDict(v_ingles, v_pt)
            id += 1
            my_dicionario[id] = new_dict 
        }
        localStorage.setItem(`id_${localSaving["word"]}`, JSON.stringify(id))
        localStorage.setItem(localSaving["word"], JSON.stringify(my_dicionario))
        localStorage.setItem("unique", JSON.stringify(true))
    }
}

changeLocalStorageMode()
