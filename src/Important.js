import Task from './Basic.js';

export default class ImportantTask extends Task {

    constructor(name, checked, type = 'important') {
        super(name, checked);
        this.type = type;
    }

}