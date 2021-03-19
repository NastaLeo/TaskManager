import ImportantTask from "./Important.js";
import UnimportantTask from "./Unimportant.js";
import UrgentTask from "./Urgent.js";
import {unimportantStore, importantStore, urgentStore} from './Store.js';




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

}



// submitTask
export function submitTask(event, rubbish) {

    event.preventDefault();

    const inputText = document.querySelector('input[type=text]');

    const option = document.querySelectorAll('option');

    const li = document.createElement('li');

    if (option[0].selected) {

        new UnimportantTask(inputText.value).create(li, rubbish);

        inputText.value = '';

        option[0].selected = false;

    } else if (option[1].selected) {

        new ImportantTask(inputText.value).create(li, rubbish);

        inputText.value = '';

        option[1].selected = false;

    } else if(option[2].selected) {

        new UrgentTask(inputText.value).create(li, rubbish);

        inputText.value = '';

        option[2].selected = false;

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

            const unimportantIndex = unimportantStore.findIndex(unimportant => unimportant.id == taskType[taskTypeName]);

            unimportantStore[unimportantIndex].checked = event.target.checked;
            
        } else if (taskTypeName === 'important') {

            const importantIndex = importantStore.findIndex(important => important.id == taskType[taskTypeName]);

            importantStore[importantIndex].checked = event.target.checked;
            
        } else if (taskTypeName === 'urgent') {

            const urgentIndex = urgentStore.findIndex(urgent => urgent.id == taskType[taskTypeName]);

            urgentStore[urgentIndex].checked = event.target.checked;
        
        }

    }

}




//delete task only if checked status is true
export function deleteTask (event) {

    if (event.target.tagName === 'IMG' && event.target.closest('li').firstElementChild.checked === true){

        const taskType = event.target.parentElement.dataset;

        const taskTypeName = Object.keys(event.target.parentElement.dataset)[0];

        event.target.closest('li').remove();

        if(taskTypeName === 'unimportant') {

            const unimportantIndex = unimportantStore.findIndex(unimportant => unimportant.id == taskType[taskTypeName]);

            unimportantStore.splice(unimportantIndex, 1);

        } else if(taskTypeName === 'important') {

            const importantIndex = importantStore.findIndex(important => important.id == taskType[taskTypeName]);

            importantStore.splice(importantIndex, 1);

        } else if(taskTypeName === 'urgent') {

            const urgentIndex = urgentStore.findIndex(urgent => urgent.id == taskType[taskTypeName]);

            urgentStore.splice(urgentIndex, 1);

        }
        
    } else {

        return

    }

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

            const unimportantIndex = unimportantStore.findIndex(unimportant => unimportant.id == taskType[taskTypeName]);

            unimportantStore[unimportantIndex].checked = event.target.checked;

            event.target.closest('li').classList.add('clean');

        }
  
    } else if (event.target.parentElement.parentElement.previousElementSibling.classList.contains('important')) {

        if (!document.querySelector('span.important').classList.contains('chosen')) {

            return

        } else {

            event.target.setAttribute('checked', event.target.checked);

            const importantIndex = importantStore.findIndex(important => important.id == taskType[taskTypeName]);

            importantStore[importantIndex].checked = event.target.checked;

            event.target.closest('li').classList.add('clean');

        }

    } else if (event.target.parentElement.parentElement.previousElementSibling.classList.contains('urgent')) {

        if (!document.querySelector('span.urgent').classList.contains('chosen')) {

            return

        } else {

            event.target.setAttribute('checked', event.target.checked);

            const urgentIndex = urgentStore.findIndex(urgent => urgent.id == taskType[taskTypeName]);

            urgentStore[urgentIndex].checked = event.target.checked;

            event.target.closest('li').classList.add('clean');

        }
    
    }
    
}


