import Task from './basic.js';
import { unimportantStore } from './store.js';

export default class UnimportantTask extends Task {

    create(li, pencil, rubbish) {

        super.create(li, pencil, rubbish);

        li.setAttribute('data-unimportant', unimportantStore.length);
       
        if (Array.from(document.querySelector('div.unimportant ul').children).length > 0 && 
            Array.from(document.querySelector('div.unimportant ul').children).some(li => li.classList.contains('clean'))) {
                
                li.classList.add('clean')

            }

        document.querySelector('div.unimportant ul').append(li);

        this.id = unimportantStore.length;

        unimportantStore.push(this);

        localStorage.setItem('unimportantStore', JSON.stringify(unimportantStore));

    }

}