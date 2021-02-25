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
        }

        if (option[1].selected) {
            document.querySelector('div.important ul').append(li);
        }

        if (option[2].selected) {
            document.querySelector('div.urgent ul').append(li);
        }
    }



    hide() {
        let list = document.querySelector('div.list-container');
        if (event.target.className != 'tasks') {
             return
        } else {
            for (let li in Array.from(event.target.nextElementSibling.children)){
                if (li.firstElementChild.checked === true) {
                   li.classList.add('clean') 
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

