import Task from './Basic.js';


export default class UrgentTask extends Task {

    constructor(name, checked, type = 'urgent') {
        super(name, checked);
        this.type = type
    }

}