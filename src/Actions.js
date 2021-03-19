import ImportantTask from "./important.js";
import UnimportantTask from "./unimportant.js";
import UrgentTask from "./urgent.js";
import {unimportantStore, importantStore, urgentStore} from './store.js';




//show-hide form to fill in
export function openForm(addButton, addList) {

    addButton.hidden = true;

    addList.classList.remove('close');

    addList.classList.add('open');

}



//close addList form
export function closeForm(addButton, addList) {

    addList.classList.add('close');

    addList.classList.remove('open');

    addButton.hidden = false;

    addButton.classList.add('active');

    document.querySelector('input[type=text]').value = '';

    document.querySelector('select').value = '';

    Array.from(document.querySelectorAll('option')).forEach(el => el.selected = false);

    Array.from(document.querySelector('.list-container').children).forEach(el => el.classList.remove('editing'));

    Array.from(document.querySelector('.list-container').children[0].lastElementChild.children).forEach(el => el.classList.remove('editing'))


}




// submitTask (click on submit button)
export function submitTask(event, pencil, rubbish, addList, addButton) {

    event.preventDefault();

    const inputText = document.querySelector('input[type=text]');
    const select = document.querySelector('select');
    const li = document.createElement('li');

    if (inputText.length = 0 || inputText.value === ' ') {

        return

    } else if (findDublicateTask(inputText.value.trim()) && !Array.from(document.querySelector('.list-container').children).some(el => el.classList.contains('editing'))) {

        showHideNotification();
        
    } else if (!findDublicateTask(inputText.value.trim()) && !Array.from(document.querySelector('.list-container').children).some(el => el.classList.contains('editing'))) {

        drawTask(inputText, select, li, pencil, rubbish);   
        
        inputText.value = '';

        select.value = '';
          
    } else if (Array.from(document.querySelector('.list-container').children).some(el => el.classList.contains('editing'))) {

        const div = Array.from(document.querySelector('.list-container').children).find(el => el.classList.contains('editing'));
        const start = Array.from(div.lastElementChild.children).find(el => el.classList.contains('editing'));
        
        if(findDublicateTask(inputText.value.trim()) === false) {
        
            changeTaskName(inputText, li, pencil, rubbish, unimportantStore, importantStore, urgentStore);
           
            closeForm(addButton, addList);

        } else if (findDublicateTask(inputText.value.trim()) && inputText.value.trim() === Array.from(start.children)[1].textContent ) {
           
            changeOnlyTaskPriority(inputText, select, li, pencil, rubbish, unimportantStore, importantStore, urgentStore);

            closeForm(addButton, addList);

        } else showHideNotification();
    }
}





//showHide notification about dublicate existence
function showHideNotification() {

    const inputText = document.querySelector('input[type=text]');

    inputText.previousElementSibling.classList.remove('notification');

    inputText.previousElementSibling.classList.add('visible');

    inputText.style.border = '2px solid red';

    inputText.addEventListener('input', function() {

        inputText.previousElementSibling.classList.add('notification');

        inputText.previousElementSibling.classList.remove('visible');

        inputText.style.border = '';

    })

}   



// create and draw new task or if task priority was changed
function drawTask(inputText, select, li, pencil, rubbish){
    
    if (select.value === 'unimportant') {

        new UnimportantTask(inputText.value.trim()).create(li, pencil, rubbish);

    } else if (select.value === 'important') {

        new ImportantTask(inputText.value.trim()).create(li, pencil, rubbish);

    } else if(select.value === 'urgent') {

        new UrgentTask(inputText.value.trim()).create(li, pencil, rubbish);

    }

}




//change task priority without name modification
function changeOnlyTaskPriority(inputText, select, li, pencil, rubbish, unimportantStore, importantStore, urgentStore) {
    
    const list = Array.from(document.querySelector('.list-container').children);

    for(let type of list) {

        if (type.classList.contains('editing')){

            const editedTask = Array.from(type.lastElementChild.children).find(el => el.classList.contains('editing'));
            
            const taskType = editedTask.dataset;
                      
            const taskTypeName = Object.keys(taskType)[0];  
            
            drawTask(inputText, select, li, pencil, rubbish);

            if (type.classList.contains('unimportant')) {

                spliceTaskFromStore(unimportantStore, taskType, taskTypeName);
               
                calculateListAttributes(unimportantStore, 'data-unimportant');
            
                changeLocalStorage('unimportantStore', unimportantStore);

            } else if (type.classList.contains('important')) {

                spliceTaskFromStore(importantStore, taskType, taskTypeName);
                           
                calculateListAttributes(importantStore, 'data-important');
            
                changeLocalStorage('importantStore', importantStore);

            } else if (type.classList.contains('urgent')) {
                
                spliceTaskFromStore(urgentStore, taskType, taskTypeName)
               
                calculateListAttributes(urgentStore, 'data-urgent');
            
                changeLocalStorage('urgentStore', urgentStore);
 
            }

            editedTask.remove();
            
        }
    }

}




// change task name without or with priority modification
function changeTaskName(inputText, li, pencil, rubbish, unimportantStore, importantStore, urgentStore) {
        
    const listContainer = Array.from(document.querySelector('.list-container').children);
    const select = document.querySelector('select');
   
    if (listContainer[0].classList.contains('editing')) {
         
        const editedTask = Array.from(listContainer[0].lastElementChild.children).find(el => el.classList.contains('editing'));
        const taskType = editedTask.dataset;
        const taskTypeName = Object.keys(editedTask.dataset)[0];

        if(select.value === 'unimportant') {
      
        drawNewTaskName(editedTask, inputText, unimportantStore, taskType, taskTypeName);

        calculateListAttributes(unimportantStore, 'data-unimportant');

        changeLocalStorage('unimportantStore', unimportantStore);
 
        } else  {

            drawTask(inputText, select, li, pencil, rubbish);

            spliceTaskFromStore(unimportantStore, taskType, taskTypeName)
               
            calculateListAttributes(unimportantStore, 'data-unimportant');
            
            changeLocalStorage('unimportantStore', unimportantStore);
            
            editedTask.remove();
        } 

    } else if (listContainer[1].classList.contains('editing')) {
      
        const editedTask = Array.from(listContainer[1].lastElementChild.children).find(el => el.classList.contains('editing'));
        const taskType = editedTask.dataset;
        const taskTypeName = Object.keys(editedTask.dataset)[0];
        
        if(select.value === 'important'){
            
        drawNewTaskName(editedTask, inputText, importantStore, taskType, taskTypeName);
       
        calculateListAttributes(importantStore, 'data-important');

        changeLocalStorage('importantStore', importantStore);

        } else {    

            console.log('new')

            drawTask(inputText, select, li, pencil, rubbish);

            spliceTaskFromStore(importantStore, taskType, taskTypeName)
                           
            calculateListAttributes(importantStore, 'data-important');
            
            changeLocalStorage('importantStore', importantStore);

            editedTask.remove();
        } 
    
    } else if (listContainer[2].classList.contains('editing') && !findDublicateTask(inputText.value.trim())) {
     
        const editedTask = Array.from(listContainer[2].lastElementChild.children).find(el => el.classList.contains('editing'));
        const taskType = editedTask.dataset;
        const taskTypeName = Object.keys(editedTask.dataset)[0];
        
        if(select.value === 'urgent'){
    
        drawNewTaskName(editedTask, inputText, urgentStore, taskType, taskTypeName);
       
        calculateListAttributes(urgentStore, 'data-urgent');

        changeLocalStorage('urgentStore', urgentStore);

        } else {

            drawTask(inputText, select, li, pencil, rubbish);

            spliceTaskFromStore(urgentStore, taskType, taskTypeName)
               
            calculateListAttributes(urgentStore, 'data-urgent');
            
            changeLocalStorage('urgentStore', urgentStore);

            editedTask.remove();
        } 
              
    } else return

} 




//draw new task name without priority changement
function drawNewTaskName(editedTask, inputText, store, taskType, taskTypeName) {

    Array.from(editedTask.children)[1].textContent = inputText.value.trim();
    const index = store.findIndex(el => el.id == taskType[taskTypeName]);
    store[index].name = inputText.value;

}






// check existence of the same task
function findDublicateTask(name) {

    let  unimportantDublicateIndex = unimportantStore.findIndex(el =>el.name === name);
    let  importantDublicateIndex = importantStore.findIndex(el =>el.name === name);
    let  urgentDublicateIndex = urgentStore.findIndex(el =>el.name === name);

    if (unimportantDublicateIndex === -1 && importantDublicateIndex === -1 && urgentDublicateIndex === -1) {

        return false;

    } else {
        
        return true;

    }

}





//mark checked status
export function markTask(event) {

     if (event.target.tagName != 'INPUT') {

       return

    } else {

        event.target.setAttribute('checked', event.target.checked);

        const taskType = event.target.parentElement.dataset;
                
        const taskTypeName = Object.keys(taskType)[0];

        if (taskTypeName === 'unimportant') {

            changeCheckedStatusInStore (event, unimportantStore, taskType, taskTypeName);

            changeLocalStorage('unimportantStore', unimportantStore);

        } else if (taskTypeName === 'important') {

            changeCheckedStatusInStore (event, importantStore, taskType, taskTypeName);

            changeLocalStorage('importantStore', importantStore);

        } else if (taskTypeName === 'urgent') {

            changeCheckedStatusInStore (event, urgentStore, taskType, taskTypeName);

            changeLocalStorage('urgentStore', urgentStore);
            
        }

    }

}



//change checked status in store
function changeCheckedStatusInStore (event, store, taskType, taskTypeName) {

    const index = store.findIndex(el => el.id == taskType[taskTypeName]);

    store[index].checked = event.target.checked;

}




//delete task only if checked status is true
export function deleteTask (event) {

    const taskType = event.target.parentElement.dataset;
    const taskTypeName = Object.keys(event.target.parentElement.dataset)[0];

    if (event.target.className === 'delete' && event.target.closest('li').firstElementChild.checked === true){

        event.target.closest('li').remove();

        if(taskTypeName === 'unimportant') {

            spliceTaskFromStore(unimportantStore,taskType, taskTypeName);

            calculateListAttributes(unimportantStore, 'data-unimportant');
            
            changeLocalStorage('unimportantStore', unimportantStore);

        } else if(taskTypeName === 'important') {

            spliceTaskFromStore(importantStore,taskType, taskTypeName);

            calculateListAttributes(importantStore, 'data-important');

            changeLocalStorage('importantStore', importantStore);
        
        } else if(taskTypeName === 'urgent') {

            spliceTaskFromStore(urgentStore,taskType, taskTypeName)

            calculateListAttributes(urgentStore, 'data-urgent');

            changeLocalStorage('urgentStore', urgentStore);

        } 

    } else return

}



//calculate index of task and delete from store
function spliceTaskFromStore(store, taskType, taskTypeName){
  
    const index = store.findIndex(el => el.id == taskType[taskTypeName]);
            
    store.splice(index, 1);
}




// recalculate id after delete previous tasks
function calculateListAttributes(store, attribute) {
    
    const list = document.querySelectorAll(`[${attribute}]`);

    for(let i in store) {

        list[i].setAttribute(attribute, i);

        store[i].id = i;
        
    }
}




// write changes to localStorage because of creating, marking and deleting tasks
function changeLocalStorage(name, store) {

    localStorage.setItem(name, JSON.stringify(store));

}




//edit task
export function editTask(event, addButton, addList) {

    if (event.target.className === 'edit' && event.target.parentElement.firstElementChild.checked === false) {
             
       addButton.hidden = true;

       addList.classList.remove('close');

       addList.classList.add('open');

       const inputText = document.querySelector('input[type=text]');
       
       inputText.value = event.target.previousElementSibling.textContent;

       const select = document.querySelector('select');
      
       if (event.target.closest('div').className === 'unimportant') {

            select.value = 'unimportant';

            event.target.parentElement.classList.add('editing');
            event.target.closest('.unimportant').classList.add('editing');
           
        } else if (event.target.closest('div').className === 'important') {

            select.value = 'important';

            event.target.parentElement.classList.add('editing');
            event.target.closest('.important').classList.add('editing');

        } else if (event.target.closest('div').className === 'urgent') {

            select.value = 'urgent';

            event.target.parentElement.classList.add('editing');
            event.target.closest('.urgent').classList.add('editing');

        }

    } else return
}






//hide-show non-marked tasks
export function hideShowTask(event) {

    if (!event.target.classList.contains('tasks')) {

        return

    } else if (!event.target.classList.contains('chosen')){

        for (let li of Array.from(event.target.nextElementSibling.children)){
            
            if (!li.firstElementChild.checked) {

                li.classList.add('clean');
                event.target.classList.add('chosen');

            } 
                    
        }

    } else if (event.target.classList.contains('chosen')) {

        for (let li of Array.from(event.target.nextElementSibling.children)){
            
            if (!li.firstElementChild.checked) {

                li.classList.remove('clean');
                event.target.classList.remove('chosen');

            } 

        }

    }

}
       





//automatically hide tasks after their unmark if hide function is active
export function hideTask(event) {

    const taskType = event.target.parentElement.dataset;
    const taskTypeName = Object.keys(taskType)[0];

    if (event.target.tagName != 'INPUT') {

        return

    } else if (event.target.parentElement.parentElement.previousElementSibling.classList.contains('unimportant')) {

        if (!document.querySelector('span.unimportant').classList.contains('chosen')) {

            return

        } else {

            event.target.setAttribute('checked', event.target.checked);
            
            changeCheckedStatusInStore (event, unimportantStore, taskType, taskTypeName);

            event.target.closest('li').classList.add('clean');

            changeLocalStorage('unimportantStore', unimportantStore);

        }
  
    } else if (event.target.parentElement.parentElement.previousElementSibling.classList.contains('important')) {

        if (!document.querySelector('span.important').classList.contains('chosen')) {

            return

        } else {
                   
            event.target.setAttribute('checked', event.target.checked);

            changeCheckedStatusInStore (event, importantStore, taskType, taskTypeName);
           
            changeLocalStorage('importantStore', importantStore);

            event.target.closest('li').classList.add('clean');

        }

    } else if (event.target.parentElement.parentElement.previousElementSibling.classList.contains('urgent')) {

        if (!document.querySelector('span.urgent').classList.contains('chosen')) {

            return

        } else {

            event.target.setAttribute('checked', event.target.checked);

            changeCheckedStatusInStore (event, urgentStore, taskType, taskTypeName);

            changeLocalStorage('urgentStore', urgentStore);

            event.target.closest('li').classList.add('clean');

        }
    
    }
    
}






//load tasks from localStorage
export function loadingTask(pencil, rubbish) {

    if (localStorage.length != 0) {

        for (let i = 0; i < localStorage.length; i++) {
           
            const key = localStorage.key(i);
                    
            if (key == 'unimportantStore') {

                const loadUnimportantStore = JSON.parse(localStorage.getItem('unimportantStore'));

                for (let j = 0; j < loadUnimportantStore.length; j++) {
                    
                    const li = document.createElement('li');

                    new UnimportantTask(loadUnimportantStore[j].name, loadUnimportantStore[j].checked).create(li, pencil, rubbish);
                     
                    if (loadUnimportantStore[j].checked) {

                        li.firstElementChild.setAttribute('checked', loadUnimportantStore[j].checked);
                    }
                    
                } 

            } else if (key === 'importantStore') {

                const loadImportantStore = JSON.parse(localStorage.getItem('importantStore'));
           
                for (let j = 0; j < loadImportantStore.length; j++) {

                    const li = document.createElement('li');

                    new ImportantTask(loadImportantStore[j].name, loadImportantStore[j].checked).create(li, pencil, rubbish);
                    
                    if (loadImportantStore[j].checked) {

                        li.firstElementChild.setAttribute('checked', loadImportantStore[j].checked);
                    }
                    
                }

            } else if (key === 'urgentStore') {

                const loadUrgentStore = JSON.parse(localStorage.getItem('urgentStore'));
           
                for (let j = 0; j < loadUrgentStore.length; j++) {

                    const li = document.createElement('li');

                    new UrgentTask(loadUrgentStore[j].name, loadUrgentStore[j].checked).create(li, pencil, rubbish);
                    
                    if (loadUrgentStore[j].checked) {

                        li.firstElementChild.setAttribute('checked', loadUrgentStore[j].checked);
                    }
                    
                }

            }

        }
               
    }

}


