import Task from './Basic.js';
import { unimportantStore } from './Store.js';

export default class UnimportantTask extends Task {

    create(li, rubbish) {

        super.create(li, rubbish);

        li.setAttribute('data-unimportant', unimportantStore.length);
       
        if (Array.from(document.querySelector('div.unimportant ul').children).length > 0 && 
            Array.from(document.querySelector('div.unimportant ul').children).some(li => li.classList.contains('clean'))) {
                
                li.classList.add('clean')

            }

        document.querySelector('div.unimportant ul').append(li);

        this.id = unimportantStore.length;

        unimportantStore.push(this);

    }

}