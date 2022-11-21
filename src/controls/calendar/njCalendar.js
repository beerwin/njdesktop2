import HasEvents from "../../hasEvents";
import NjCalendarMonth from "./njCalendarMonth";

class NjCalendar extends HasEvents {
    constructor(parentElement) {
        super();
        this.element = document.createElement('div');
        this.element.classList.add('nj-calendar');                
        this.currentDate = new Date();
        this.months = [new NjCalendarMonth(this.element, {
            year: this.currentDate.getFullYear(),
            month: this.currentDate.getMonth(),
        })];
        if (parentElement) {
            parentElement.appendChild(this.element);
        }
    }

    setParent(parentElement) {
        parentElement.appendChild(this.element);
    }

    destroy() {
        super.destroy();
        for (let x in this.months) {
            this.months[x].destroy();
        }
        this.element.parentNode.removeChild(this.element);
    }
}

export default NjCalendar;