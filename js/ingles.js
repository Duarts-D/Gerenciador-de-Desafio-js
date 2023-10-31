const chave = ['day', 'night', 'afternoon', 'morning', 'together', 'theirs', 'theirs', 'his', 'hers', 'he', 'her', 'them', 'thdia:em',
 'me', 'my', 'with', 'where', 'how much', 'I want', 'we want', 'how much?', 'seriously', 'parents', 'brother ', 'sister', 'grandmother',
  'grandfather', 'aunt', 'cousin', 'cousin', 'uncle', 'good', 'bad', 'terrible', 'horrible', 'reading', 'reading', 'writing', 'writing',
   'running', 'running', 'playing', 'playing'] 
const dicionario = {'day':'dia', 'night':'noite', 'afternoon':'tarde', 'morning':'manha', 'together':'juntos', 'theirs':'deles', 'his':'dele',
 'hers':'dela', 'he':'ele', 'her':'ela', 'them':'eles', 'me':'eu', 'my':'meu', 'with':'com', 'where':'onde', 'how much':'quanto', 'I want':'eu quero',
  'we want':'nos queremos', 'how much?':'quanto?', 'seriously':'serio', 'parents':'pais', 'brother ':'irmão', 'sister':'irmã', 'grandmother':'avó',
   'grandfather':'avô', 'aunt':'tia', 'cousin':'primo', 'uncle':'tio', 'good':'bom', 'bad':'ruim', 'terrible':'terrivel', 'horrible':'horrivel', 'reading':'lendo', 'writing':'escrevendo', 'running':'correndo', 'playing':'brincando'}

const spaningles = document.getElementById('ingles')
const spanpt = document.getElementById('pt_br')
const input = document.getElementById('input')
let dicionario_ativo
const acerto = document.getElementById('acerto')
const reset = document.getElementById('resetar')
const img = document.getElementById('img')
let eyes = false

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
        console.log('1',e.target.src)
    }else{
        e.src = './img/eyes_is_closed.png'
        console.log('2',e.scr)
    }
    eyes = false
    textEyeClosedSpan(dicionario_ativo[1])
}



input.addEventListener('keydown',(event)=>{
    if (event.key == "Enter"){
        const valor = event.target.value
        if (valor == dicionario_ativo[1]){
            spanpt.textContent = dicionario_ativo[1]
            acerto.style.color = 'white'
            acerto.textContent = `${dicionario_ativo[0]} - ${dicionario_ativo[1]}`
        }else{
            acerto.style.color = 'red'
            acerto.textContent = 'Tente Novamente'
        }
    }
})

function textEyeMostraSpan(){
    spanpt.textContent = dicionario_ativo[1]

}



const numeroAleatorio = Math.floor(Math.random() * 36);


function randomIngles(){
    const qt = Object.keys(dicionario).length
    const numeroAleatorio = Math.floor(Math.random() * qt);
    const ab = retornoDicionario(numeroAleatorio)
    spanTextContentIngles(ab[0])
    textEyeClosedSpan(ab[1])
    dicionario_ativo = ab
}
function retornoDicionario(num){
    console.log(num)

    const key_ingles = chave[`${num}`]
    const key_pt = dicionario[key_ingles]
    console.log(key_pt,key_ingles)
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
    randomIngles(dicionario)
    acerto.textContent = ''
    input.value = ''
    eyeClosed(img)
})

randomIngles(dicionario)

