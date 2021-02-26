import './assets/styles/style.css';
import planner from './assets/images/planner.png';
import {buttonAdd, openForm, close, closeForm, submitTask} from './Actions.js';
import Task from './Basic.js';
import ImportantTask from "./Important.js";
import UnimportantTask from "./Unimportant.js";
import UrgentTask from "./Urgent.js";



//draw favicon
let favicon = document.querySelector('link[rel=icon]');
favicon.href = planner;

//show form fo fill in
buttonAdd.addEventListener('click', openForm);

//hide form fo fill in
close.addEventListener('click', closeForm);




let form = document.querySelector('form');

//submitTask
form.addEventListener('submit', submitTask);





let list = document.querySelector('div.list-container');

//delete task
list.addEventListener('click', new Task().delete);

//maintain checked state
list.addEventListener('click', new Task().mark);

//hide/show non-marked tasks
list.addEventListener('click', new Task().hideShow);

//tasks after their unmark
list.addEventListener('click', new ImportantTask().hideTask);
list.addEventListener('click', new UnimportantTask().hideTask);
list.addEventListener('click', new UrgentTask().hideTask);