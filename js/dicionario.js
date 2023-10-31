const my_list_all = document.getElementById('my_dic_all')
const my_list = document.getElementById('my_dic')
const checkbox = document.getElementById('button_check')

console.log(input)

checkbox.addEventListener('change',(e)=>{
    const check  = e.target.checked
    if (check){
        my_list_ativo()
    }else{
        my_list_all_ativo()
    }

})


function my_list_ativo(){
    my_list_all.style.color = 'white'
    my_list.style.color = 'red'
}

function my_list_all_ativo(){
    my_list.style.color = 'white'
    my_list_all.style.color = 'red'
}