import HasEvents from "../../hasEvents";
import NjCalendarMonth from "./njCalendarMonth";

class NjCalendar extends HasEvents {
    constructor(parentElement, options) {
        super();
        this.options = Object.assign({}, {
            locale: 'en',
        }, options);
        this.element = document.createElement('div');
        this.element.classList.add('nj-calendar');                
        this.currentDate = new Date();
        this.months = [new NjCalendarMonth(this.element, {
            year: this.currentDate.getFullYear(),
            month: this.currentDate.getMonth(),
            locale: this.options.locale,
        })];
        if (parentElement) {
            parentElement.appendChild(this.element);
        }
    }

    setParent(parentElement) {
        parentElement.appendChild(this.element);
    }

    destroyMonths() {
        for (let x in this.months) {
            this.months[x].destroy();
        }
    }

    destroy() {
        super.destroy();
        this.destroyMonths();
        this.element.parentNode.removeChild(this.element);
    }
}

export default NjCalendar;