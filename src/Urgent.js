import Task from './basic.js';
import { urgentStore } from './store.js';


export default class UrgentTask extends Task {

     create(li, pencil, rubbish) {

        super.create(li, pencil, rubbish);

        li.setAttribute('data-urgent', urgentStore.length);

        if (Array.from(document.querySelector('div.urgent ul').children).length > 0 && 
            Array.from(document.querySelector('div.urgent ul').children).some(li => li.classList.contains('clean'))) {
                
                li.classList.add('clean')

        }

        document.querySelector('div.urgent ul').append(li);

        this.id = urgentStore.length;

        urgentStore.push(this);

        localStorage.setItem('urgentStore', JSON.stringify(urgentStore));

    }

}