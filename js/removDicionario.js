import { controltext } from "./main.js";
import { localSaving} from "./addDicionario.js";

const table = document.getElementById('tabela_remover');
let  my_dicts = {};
const button_turn_on_table = document.getElementById('table_button_ativar');
const button_turn_off_table = document.getElementById('table_off');
const container_table = document.getElementById('container_table');
const searchs = document.getElementById('search');
const mainElement = document.querySelector('main');
let tableSearch;
let buttonExcluir;


button_turn_on_table.addEventListener('click',()=>{
    EventTable.excludeAllEventsOfButtons();
    table.innerHTML = '';
    new ControlOfDict();

    button_turn_on_table.style.display = 'none';
    container_table.style.display = 'block';
    mainElement.style.opacity = '0.5';
})

searchs.addEventListener('input',()=>{
    const value = searchs.value;
    const search = new Search(value);
    search.tableSearch();
})


button_turn_off_table.addEventListener('click',()=>{
    container_table.style.display = 'none';
    mainElement.style.opacity = '1';
    button_turn_on_table.style.display = 'block';
    controltext.newChanges();
})


class ControlOfDict{
    constructor(){
        this.control = this.controlUnityOfItems();
    }
    controlUnityOfItems(){
        this.getDictLocalStorage();
        Object.entries(my_dicts).forEach(function(value){
            const id = value[0];
            const pt = value[1]["pt"];
            const en = value[1]["en"];

            CreateTable.makeTableRow(id, pt, en);
        });
        tableSearch = document.querySelectorAll('tr');
        EventTable.makeDeleteEvent();
    }

    getDictLocalStorage(){
        for (let key in localSaving){
            let dict = JSON.parse(localStorage.getItem(localSaving[key])) || {};
            for (let k in dict){
                my_dicts[`${k}-${key}`] = dict[k];
            }
        }
    }
}

class CreateTable{
    static makeTableRow(id,pt,en){
        const elemento = document.createElement('tr');
        elemento.innerHTML = `<td>${en}</td><td>${pt}</td>
            <td class="tabela_button_cotaineri">
            <button data-excluir data-name=${id}>Excluir</button>
            </td>`;
        table.appendChild(elemento);
    }

    static removeItemTheTable(event){
        const row = event.target.parentElement.parentElement;
        const  key = event.target.dataset.name;
        EventTable.excludeEvent(event);
        row.remove();

        Search.removeSearchInArraySearch(row);

        const buttonsExclude = document.querySelectorAll('[data-excluir]');
        if (buttonsExclude.length < 1){
            this.emptyTable();
        }
        return key;
    }

    static emptyTable(){
        table.innerHTML = '<tr><td></td><td class="table_vazia">Nenhuma Palavra!</td><td></td></tr>';
    }
}

class EventTable{
    // Create event in delete buttons 
    static makeDeleteEvent(){
        buttonExcluir = document.querySelectorAll('[data-excluir]');
        if(Object.keys(my_dicts).length > 0){
            buttonExcluir.forEach(event=>{
                event.addEventListener('click',EventTable.clickedEvent);
            })
        }else{
            CreateTable.emptyTable();
        }
    }

    static clickedEvent(event){
        const key = CreateTable.removeItemTheTable(event);
        Save.dictSave(key);
    }

    static excludeEvent(event){
        // remove event used
        event.target.removeEventListener('click',EventTable.eventHandler);
    }

    static excludeAllEventsOfButtons(){
        const buttonsExcluir = document.querySelectorAll('[data-excluir]');
        buttonsExcluir.forEach((target)=>{
            target.removeEventListener('click',EventTable.eventHandler);
        })
    }
}

class Save{
    static dictSave(key){
        const keys = key.split("-");
        const key_id = keys[0];
        const key_local = localSaving[keys[1]];
        let dict = JSON.parse(localStorage.getItem(key_local)) || {};
        delete dict[key_id];
        localStorage.setItem(key_local, JSON.stringify(dict));
        
        // Deleting of dictall
        delete my_dicts[key];
        }
    }


class Search{
    constructor(value){
        this.value = value;
    }
    tableSearch(){
        table.innerHTML = '';
        const search = this.value.toLowerCase();
        tableSearch.forEach((e)=>{
            if(e.rowIndex !== 0 ){
                const celulas = e.cells;
                const celula_1 = celulas[0].textContent.toLowerCase();
                const celula_2 = celulas[1].textContent.toLowerCase();
                if(celula_1.includes(search) || celula_2.includes(search)){
                    table.appendChild(e);
                }
            }
        })
        const result_table_search = document.querySelectorAll('tr');
        if(result_table_search.length === 1){
            CreateTable.emptyTable();
        }
    }
    
    static removeSearchInArraySearch(tr){
        tableSearch.forEach(e=>{
            if(tr === e){
                const arrayList = Array.from(tableSearch);
                const indice = arrayList.findIndex(elemento => Search.seletorIndexArray(elemento,tr));
                arrayList.splice(indice,1);
                tableSearch = arrayList;
            }
        })
    }

    static seletorIndexArray(elemento,tr){
        if (elemento === tr){
            return true;
        }
        return false;
    }
}