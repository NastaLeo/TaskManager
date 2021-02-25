import './assets/styles/style.css';

//draw favicon
import planner from './assets/images/planner.png';
let favicon = document.querySelector('link[rel=icon]');
favicon.href = planner;



import {buttonAdd, openForm, close, closeForm, submitTask} from './Actions.js';
import Task from './Basic.js';


//show-hide form fo fill in
buttonAdd.addEventListener('click', openForm);

close.addEventListener('click', closeForm);


let form = document.querySelector('form');

//submitTask
form.addEventListener('submit', submitTask);


let list = document.querySelector('div.list-container');

//delete task
list.addEventListener('click', Task.delete);

//hide non-marked tasks
list.addEventListener('click', Task.hide);