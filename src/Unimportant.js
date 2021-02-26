import Task from './Basic.js';

export default class UnimportantTask extends Task {

    constructor(name, checked, type = 'unimportant') {
        super(name, checked);
        this.type = type
    }

    hideTask(event) {
        if (event.target.tagName != 'INPUT') {
            return
        } else if (!document.querySelector('span.unimportant').classList.contains('chosen')) {
            return
        } else if (!event.target.checked) {
            event.target.setAttribute('checked', false);
            event.target.closest('li').classList.add('clean');
        } 
    }

}