import Task from './basic.js';
import { importantStore } from './store.js';

export default class ImportantTask extends Task {

    create(li, pencil, rubbish) {

        super.create(li, pencil, rubbish);

        li.setAttribute('data-important', importantStore.length);
        
        if (Array.from(document.querySelector('div.important ul').children).length > 0 && 
            Array.from(document.querySelector('div.important ul').children).some(li => li.classList.contains('clean'))) {
                
                li.classList.add('clean')

            }

        document.querySelector('div.important ul').append(li);

        this.id = importantStore.length;

        importantStore.push(this);

        localStorage.setItem('importantStore', JSON.stringify(importantStore));
       
    }

}