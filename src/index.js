import {openForm, closeForm, submitTask, markTask, deleteTask, hideShowTask, hideTask, editTask, loadingTask} from './actions.js';

import planner from './assets/images/planner.png';
import cross from './assets/images/cross.png';
import pencil from './assets/images/edit.png';
import rubbish from './assets/images/rubbish.png';


import './assets/styles/style.css';


const favicon = document.querySelector('link[rel=icon]');
const addButton = document.querySelector('button[data-action=add]');
const addList = document.querySelector('.add-list');
const form = document.querySelector('form');
const close = document.querySelector('img.cross');
const list = document.querySelector('div.list-container');



//draw favicon
favicon.href = planner;


//draw cross in addList form
close.src = cross;


//show form fo fill in
addButton.addEventListener('click', () => openForm(addButton, addList));


//hide form fo fill in
close.addEventListener('click', () => closeForm(addButton, addList));


//submitTask
form.addEventListener('submit', (event) => submitTask(event, pencil, rubbish, addList, addButton));


//mark checked status
list.addEventListener('click', (event) => markTask(event));



//delete task
list.addEventListener('click', (event) => deleteTask(event));



//hide-show non-marked tasks
list.addEventListener('click', (event) => hideShowTask(event));



//automatically hide tasks after their unmark if hide function is active
list.addEventListener('click', (event) => hideTask(event));


//edit task
list.addEventListener('click', (event) => editTask(event, addButton, addList));



//load data from localStorage
window.addEventListener("load", () => loadingTask(pencil, rubbish));


