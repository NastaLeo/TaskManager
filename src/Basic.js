import './assets/styles/style.css';
import rubbish from './assets/images/rubbish1.png';


export default class Task {

    constructor(name, checked = false) {
        this.name = name;
        this.checked = checked
    }

    create() {
        let li = document.createElement('li');

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        let liContent = document.createElement('span');
        liContent.textContent = this.name;

        let deleteIcon = document.createElement('img');
        deleteIcon.src = rubbish;
        deleteIcon.classList.add('delete');

        li.append(checkbox);
        li.append(liContent);
        li.append(deleteIcon);

        let option = document.querySelectorAll('option');

        if (option[0].selected) {
            document.querySelector('div.unimportant ul').append(li);

            if (Array.from(document.querySelector('div.unimportant ul').children).length > 0 && 
            Array.from(document.querySelector('div.unimportant ul').children).some(li => li.classList.contains('clean'))) {
                
            li.classList.add('clean')
            }
        }

        else if (option[1].selected) {
            document.querySelector('div.important ul').append(li);

            if (Array.from(document.querySelector('div.important ul').children).length > 0 && 
            Array.from(document.querySelector('div.important ul').children).some(li => li.classList.contains('clean'))) {
                
            li.classList.add('clean')
            }
        }

        else if (option[2].selected) {
            document.querySelector('div.urgent ul').append(li);

            if (Array.from(document.querySelector('div.urgent ul').children).length > 0 && 
            Array.from(document.querySelector('div.urgent ul').children).some(li => li.classList.contains('clean'))) {
                
            li.classList.add('clean')
            }
        }
    }

    mark(event) {
        if (event.target.tagName != 'INPUT') {
            console.log('no');
            return
        } else {
            if (event.target.checked) {
                console.log('true');
                event.target.checked = true;
                event.target.setAttribute('checked', true);
            } else {
                console.log('false');
                event.target.checked = false;
                event.target.setAttribute('checked', false);
            }
        }
    }


    hideShow(event) {
        if (!event.target.classList.contains('tasks')) {
            console.log(4)
            return
        } else {
            for (let li of Array.from(event.target.nextElementSibling.children)){
                 console.log(li)
                if (!li.firstElementChild.checked) {
                   console.log(2);
                   li.classList.toggle('clean');
                   event.target.classList.toggle('chosen')
                }
            }
        } 
    }


    delete(event) {
        if (event.target.className === 'delete' && event.target.closest('li').firstElementChild.checked === true){
            event.target.closest('li').remove();
        } else {
            return
        }
    }
    
}
