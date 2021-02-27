import {openForm, closeForm, submitTask, markTask, deleteTask} from './Actions.js';

import planner from './assets/images/planner.png';
import cross from './assets/images/cross.png';
import rubbish from './assets/images/rubbish1.png';


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
form.addEventListener('submit', (event) => submitTask(event, rubbish));


//mark checked status
list.addEventListener('click', (event) => markTask(event));



//delete task
list.addEventListener('click', (event) => deleteTask(event));



//hide/show non-marked tasks
// list.addEventListener('click', hideShowTask());

//tasks after their unmark
// list.addEventListener('click', new ImportantTask().hideTask);
// list.addEventListener('click', new UnimportantTask().hideTask);
// list.addEventListener('click', new UrgentTask().hideTask);