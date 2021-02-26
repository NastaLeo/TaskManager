import Task from './Basic.js';

export default class ImportantTask extends Task {

    constructor(name, checked, type = 'important') {
        super(name, checked);
        this.type = type;
    }
  
    hideTask(event) {
        if (event.target.tagName != 'INPUT') {
            return
        } else if (!document.querySelector('span.important').classList.contains('chosen')) {
            return
        } else if (!event.target.checked) {
            event.target.setAttribute('checked', false);
            event.target.closest('li').classList.add('clean');
        } 
    }
    

}