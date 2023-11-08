import randomIngles from "./main.js";


const tabela = document.getElementById('tabela_remover')
let  my_dicionario = {}
const button_turn_on_table = document.getElementById('table_button_ativar')
const button_turn_off_table = document.getElementById('table_off')
const container_table = document.getElementById('container_table')
const buscar = document.getElementById('search')
const mainElement = document.querySelector('main')
let tabela_search
let buttonExcluir


button_turn_on_table.addEventListener('click',()=>{
    tabela.innerHTML = ''
    ListaDePalavras()
    button_turn_on_table.style.display = 'none'
    container_table.style.display = 'block'
    mainElement.style.opacity = '0.5'
})

buscar.addEventListener('input',()=>{
    const valor = buscar.value
    buscarTabela(valor)

})

function buscarTabela(valor){
    tabela.innerHTML = ''
    const buscar = valor.toLowerCase()
    tabela_search.forEach((e)=>{
        if(e.rowIndex !== 0 ){
            const celulas = e.cells
            const celula_1 = celulas[0].textContent.toLowerCase()
            const celula_2 = celulas[1].textContent.toLowerCase()
            if(celula_1.includes(buscar) || celula_2.includes(buscar)){
                tabela.appendChild(e)
            }
        }
    })
    const result_tabela_search = document.querySelectorAll('tr')
    if(result_tabela_search.length === 1){
        tabelaVazia()
    }
}


button_turn_off_table.addEventListener('click',()=>{
    container_table.style.display = 'none'
    mainElement.style.opacity = '1'
    button_turn_on_table.style.display = 'block'
    randomIngles()
})



function ListaDePalavras(){
    my_dicionario = JSON.parse(localStorage.getItem('my_dicionario')) || {}
    Object.entries(my_dicionario).forEach(function(valor){
        const key = valor[0]
        const value = valor[1]
        createElement(key,value)
        buttonExcluir = document.querySelectorAll('#excluir')
        tabela_search = document.querySelectorAll('tr')
    })
    criarCelulas()
}

function createElement(key,valor){
    const elemento = document.createElement('tr')
    elemento.innerHTML = `<td id="table_search">${key}</td><td id="table_search">${valor}</td><td class="tabela_button_cotaineri"><button id="excluir" data-name=${key}>Excluir</button></td>`
    tabela.appendChild(elemento)
}

function criarCelulas(){
    if(Object.keys(my_dicionario).length > 0){
        buttonExcluir.forEach(evento=>{
         evento.addEventListener('click',()=>{
            removePalavraChave(evento)
            salvarDicionario()
         })
        })
    }else{
        tabelaVazia()
    }
}


function tabelaVazia(){
    tabela.innerHTML = '<tr><td></td><td class="table_vazia">Nenhuma Palavra!</td><td></td></tr>'
}

function removePalavraChave(element){
    const removLinha = element.parentElement.parentElement
    const  valor = element.dataset.name
    delete my_dicionario[valor]
    removLinha.remove()
    removerTableSearch(removLinha)
    const buttonExcluir = document.querySelectorAll('#excluir')
    if (buttonExcluir.length < 1){
        tabelaVazia()
    }
}

function salvarDicionario(){
    localStorage.setItem('my_dicionario', JSON.stringify(my_dicionario))
}


function removerTableSearch(tr){
    tabela_search.forEach(e=>{
        if(tr === e){
            const arrayList = Array.from(tabela_search)
            const indice = arrayList.findIndex(elemento =>seletorIndexArray(elemento,tr))
            arrayList.splice(indice,1)
            tabela_search = arrayList
        }
    })
}

function seletorIndexArray(elemento,tr){
    if (elemento === tr){
        return true
    }
    return false
}