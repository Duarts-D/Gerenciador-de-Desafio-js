const chave = ['day', 'night', 'afternoon', 'morning', 'together', 'theirs', 'his', 'hers', 'he', 'her', 'them',
 'me', 'my', 'with', 'where', 'how much', 'I want', 'we want', 'how much?', 'seriously', 'parents', 'brother ', 'sister', 'grandmother',
  'grandfather', 'aunt', 'cousin', 'cousin', 'uncle', 'good', 'bad', 'terrible', 'horrible', 'reading', 'reading', 'writing', 'writing',
   'running', 'playing'] 
const dicionario = {'day':'dia', 'night':'noite', 'afternoon':'tarde', 'morning':'manha', 'together':'juntos', 'theirs':'deles', 'his':'dele',
 'hers':'dela', 'he':'ele', 'her':'ela', 'them':'eles', 'me':'eu', 'my':'meu', 'with':'com', 'where':'onde', 'how much':'quanto', 'I want':'eu quero',
  'we want':'nos queremos', 'how much?':'quanto?', 'seriously':'serio', 'parents':'pais', 'brother ':'irmão', 'sister':'irmã', 'grandmother':'avó',
   'grandfather':'avô', 'aunt':'tia', 'cousin':'primo', 'uncle':'tio', 'good':'bom', 'bad':'ruim', 'terrible':'terrivel', 'horrible':'horrivel', 'reading':'lendo', 'writing':'escrevendo', 'running':'correndo', 'playing':'brincando'}

let chaveAll
let dicionarioAll
let chave_2 
let dicionario_2
let disc_userOrPadrao
let quantidade
let palavraSecreta
const spaningles = document.getElementById('ingles')
const spanpt = document.getElementById('pt_br')
const input = document.getElementById('input')
let dicionario_ativo
const Palvraacertada = document.getElementById('acerto')
const reset = document.getElementById('resetar')
const img = document.getElementById('img')
let eyes = false

const spanQtdSeg = document.getElementById('quantidade_acerto_seguidos')
const spanQtdAcertos = document.getElementById('Acertos')
const spanRecorde = document.getElementById('Recorde')
let qtdActSeguidos = 0
let acertou
let qtdAcertos = 0

function controleRecorde(){
    const recorde =  JSON.parse(localStorage.getItem('recorde')) || 0
    spanRecorde.textContent = recorde
    if (qtdActSeguidos > recorde ){
        localStorage.setItem('recorde', JSON.stringify(qtdActSeguidos))
    }
}

function controleActSeguidos(){
    if(acertou){
        qtdActSeguidos = qtdActSeguidos + 1
        spanQtdSeg.textContent = qtdActSeguidos
        acertou = false
    }else{
        qtdActSeguidos = 0
        spanQtdSeg.textContent = qtdActSeguidos
    }
}

function controleAcertou(){
    qtdAcertos = qtdAcertos + 1
    spanQtdAcertos.textContent = qtdAcertos
}


input.addEventListener('keydown',(event)=>{
    if (event.key == "Enter"){
        const valor = event.target.value
        if (palavraSecreta){
            event.target.value = ''
            resetAcerto()
            palavraSecreta = false
        }else{
        if (valor.toLowerCase() == dicionario_ativo[1].toLowerCase()){
            spanpt.textContent = dicionario_ativo[1]
            Palvraacertada.style.color = 'white'
            Palvraacertada.textContent = `${dicionario_ativo[0]} - ${dicionario_ativo[1]}`
            palavraSecreta = true
            controleAcertou()
            acertou = true
            controleActSeguidos()
            controleRecorde()
        }else{
            controleActSeguidos()
            Palvraacertada.style.color = 'red'
            Palvraacertada.textContent = 'Tente Novamente'
        }
    }
    }
})

function dicionarioTodos(){
    dicionarioAll = { ...dicionario, ...dicionario_2}
    chaveAll = [...chave ,...chave_2]
}

img.addEventListener('click',function (e){
    if (eyes == false){
        eyeOpen(e)
    }else{
        eyeClosed(e)
    }
})

function eyeOpen(e){
    e.target.src = './img/eyes_is_open.png'
    eyes = true
    textEyeMostraSpan()
}

function eyeClosed(e){
    if (e instanceof Event){
        e.target.src = './img/eyes_is_closed.png'
    }else{
        e.src = './img/eyes_is_closed.png'
    }
    eyes = false
    textEyeClosedSpan(dicionario_ativo[1])
}



function textEyeMostraSpan(){
    spanpt.textContent = dicionario_ativo[1]

}

export default function randomIngles(){
    disc_userOrPadrao = JSON.parse(localStorage.getItem('dicionario')) || false
    dicionario_2 = JSON.parse(localStorage.getItem('my_dicionario')) || {}
    chave_2 = Object.keys(dicionario_2)
    dicionarioTodos()
    if (disc_userOrPadrao){
        if(Object.keys(dicionario_2).length > 0 ){
            randomDicionario(dicionario_2)
        }else{
            spaningles.textContent = 'Nehuma palavra'
            spanpt.textContent = 'Adicione ou mude para todas'
        }
    }else{
        randomDicionario(dicionarioAll)
    }
}

function chaves_gerador_contexto(chave_num,dic,num){
    const key_ingles = chave_num[`${num}`]
    const key_pt = dic[key_ingles]
    return [key_ingles,key_pt]
}

function spanTextContentIngles(ingles){
    spaningles.textContent = ingles
}

function textEyeClosedSpan(pt_br){
    const repeticao = pt_br.length
    const texto ='-'
    spanpt.textContent = texto.repeat(repeticao)
}


reset.addEventListener('click',()=>{
    resetAcerto()
})

function resetAcerto(){    
    randomIngles()
    Palvraacertada.textContent = ''
    input.value = ''
    eyeClosed(img)
    palavraSecreta = false

}

function randomDicionario(dic){
    if (disc_userOrPadrao){
        quantidade = Object.keys(dic).length
    }else{
        quantidade = chaveAll.length
    }
    
    const numeroAleatorio = Math.floor(Math.random() * quantidade);

    const ab = retornoDicionario(numeroAleatorio)
    spanTextContentIngles(ab[0])
    textEyeClosedSpan(ab[1])
    dicionario_ativo = ab
}

function retornoDicionario(num){
    if(disc_userOrPadrao){
        const dicionario_user = JSON.parse(localStorage.getItem('my_dicionario'))
        return chaves_gerador_contexto(chave_2,dicionario_user,num)
    }else{
        return chaves_gerador_contexto(chaveAll,dicionarioAll,num)
    }
}

controleRecorde()
randomIngles()