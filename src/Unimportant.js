import Task from './Basic.js';

export default class UnimportantTask extends Task {

    constructor(name, checked, type = 'unimportant') {
        super(name, checked);
        this.type = type
    }

   

}