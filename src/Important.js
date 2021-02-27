import Task from './Basic.js';
import { importantStore } from './Store.js';

export default class ImportantTask extends Task {

    create(li, rubbish) {

        super.create(li, rubbish);

        li.setAttribute('data-important', importantStore.length);
        
        if (Array.from(document.querySelector('div.important ul').children).length > 0 && 
            Array.from(document.querySelector('div.important ul').children).some(li => li.classList.contains('clean'))) {
                
                li.classList.add('clean')

            }

        document.querySelector('div.important ul').append(li);

        this.id = importantStore.length;

        importantStore.push(this);
       
    }

}