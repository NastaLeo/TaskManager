export default class Task {

    constructor(name, checked = false) {

        this.name = name;
        this.checked = checked

    }

    create(li, rubbish) {

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const liContent = document.createElement('span');
        liContent.textContent = this.name;

        const deleteIcon = document.createElement('img');
        deleteIcon.src = rubbish;
        deleteIcon.classList.add('delete');

        li.append(checkbox);
        li.append(liContent);
        li.append(deleteIcon);

    }
    
}
