import ImportantTask from "./Important.js";
import UnimportantTask from "./Unimportant.js";
import UrgentTask from "./Urgent.js";


let buttonAdd = document.querySelector('button[data-action=add]');

//show-hide form fo fill in
function openForm(){
    let addList = document.querySelector('.add-list');
    buttonAdd.hidden = true;
    addList.classList.remove('close');
    addList.classList.add('open');
}



//draw cross in addList form
import cross from './assets/images/cross.png';
let close = document.querySelector('img.cross');
close.src = cross;


//close addList form
function closeForm() {
    let addList = document.querySelector('.add-list');
    addList.classList.add('close');
    addList.classList.remove('open');
    buttonAdd.hidden = false;
    buttonAdd.classList.add('active');
}

// submitTask
function submitTask(event) {
    event.preventDefault();
    let inputText = document.querySelector('input[type=text]');
    let option = document.querySelectorAll('option');

    if (option[0].selected) {
        new UnimportantTask(inputText.value).create();
        inputText.value = '';
        option[0].selected = false;
    } else if (option[1].selected) {
        new ImportantTask(inputText.value).create();
        inputText.value = '';
        option[1].selected = false;
    } else if(option[2].selected) {
        new UrgentTask(inputText.value).create();
        inputText.value = '';
        option[2].selected = false;
    }
}



     
export {buttonAdd, openForm, close, closeForm, submitTask};