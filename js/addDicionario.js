const buttonSalvar = document.getElementById('button_salvar')
const inputIngles = document.getElementById('ingles_input')
const inputPt = document.getElementById('pt_input')
const error_input_ingles = document.querySelector('.error_input_ingles')
const error_input_pt = document.querySelector('.error_input_pt')
const container_2_inputs  = document.querySelector('.container_2_bloco_1')


container_2_inputs.addEventListener('mouseleave',()=>{
    setTimeout(removeError,((15*1000)))
})


buttonSalvar.addEventListener('click',(e)=>{
    e.preventDefault()
    const validity_ingles = validityCampo(inputIngles)
    const validity_pt = validityCampo(inputPt)
    if(validity_ingles && validity_pt){
        console.log('dentro')
        const valorIngles = inputIngles.value
        const valorPt = inputPt.value
        addDicionarioLocalStorage(valorIngles,valorPt)
    }
})

inputIngles.addEventListener('blur',()=>{
    validityCampo(inputIngles)
})

inputIngles.addEventListener('input',()=>{
    error_input_ingles.textContent = ''
})

inputPt.addEventListener('blur',()=>{
    validityCampo(inputPt)
})

inputPt.addEventListener('input',()=>{
    error_input_pt.textContent = ''
})

function validityCampo(campo){
    const validity = campo.validity.valueMissing
    const name = campo.name
    if(validity){
        if(name== 'ingles'){
            error_input_ingles.textContent = 'Preenchar o campo'
        }else{
            error_input_pt.textContent = 'Preenchar o campo'
        }
    }else{
        if(name == 'ingles'){
            error_input_ingles.textContent = ''
        }else{
            error_input_pt.textContent = ''
        }
    }
    return !validity
}

function addDicionarioLocalStorage(v_ingles,v_pt){
    const my_dicionario = JSON.parse(localStorage.getItem('my_dicionario')) || {}
    my_dicionario[v_ingles] = v_pt
    localStorage.setItem('my_dicionario', JSON.stringify(my_dicionario))
}

function removeError(){
    error_input_ingles.textContent = ''
    error_input_pt.textContent = ''
}