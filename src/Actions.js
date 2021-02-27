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




//internal function to find task index and is used in functions: markTask, deleteTask
// function defineIndex(type, name, store) {

//     const index = store.findIndex(el => el.id == type[name]);

//     return index;

// }



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
     









//export function hideShowTask(event) {
//     if (!event.target.classList.contains('tasks')) {
//         console.log(4)
//         return
//     } else {
//         for (let li of Array.from(event.target.nextElementSibling.children)){
//              console.log(li)
//             if (!li.firstElementChild.checked) {
//                console.log(2);
//                li.classList.toggle('clean');
//                event.target.classList.toggle('chosen')
//             }
//         }
//     } 
// }





// hideTask(event) {
//     if (event.target.tagName != 'INPUT') {
//         return
//     } else if (!document.querySelector('span.important').classList.contains('chosen')) {
//         return
//     } else if (!event.target.checked) {
//         event.target.setAttribute('checked', false);
//         event.target.closest('li').classList.add('clean');
//     } 
// }

// hideTask(event) {
//     if (event.target.tagName != 'INPUT') {
//         return
//     } else if (!document.querySelector('span.unimportant').classList.contains('chosen')) {
//         return
//     } else if (!event.target.checked) {
//         event.target.setAttribute('checked', false);
//         event.target.closest('li').classList.add('clean');
//     } 
// }


// hideTask(event) {
//     if (event.target.tagName != 'INPUT') {
//         return
//     } else if (!document.querySelector('span.urgent').classList.contains('chosen')) {
//         return
//     } else if (!event.target.checked) {
//         event.target.setAttribute('checked', false);
//         event.target.closest('li').classList.add('clean');
//     } 
// }